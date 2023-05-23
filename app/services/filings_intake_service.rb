class FilingsIntakeService
	include HTTParty
  
	def initialize(intake_paths)
		@base_url = 'https://filing-service.s3-us-west-2.amazonaws.com/'
		@intake_paths = intake_paths
	end

	def call
		@intake_paths.each do |path|
			puts "Loading data from #{path}"

			response = HTTParty.get("#{@base_url}#{path}")
			if response.success?
				data = response.parsed_response.first.last
				
				# Check against our data if Filer exists, if not create one, otherwise use that as our Filer
				filer = Organization.where('ein = ?', data["ReturnHeader"]["Filer"]["EIN"]).first
				unless filer
					# Cello - TODO maybe break into seperate service since paths may vary for things like name
					filer = Organization.create(
							ein: data["ReturnHeader"]["Filer"]["EIN"],
							name: data["ReturnHeader"]["Filer"]["BusinessName"]["BusinessNameLine1Txt"],
							address: data["ReturnHeader"]["Filer"]["USAddress"]["AddressLine1Txt"],
							city: data["ReturnHeader"]["Filer"]["USAddress"]["CityNm"],
							state: data["ReturnHeader"]["Filer"]["USAddress"]["StateAbbreviationCd"],
							zip: data["ReturnHeader"]["Filer"]["USAddress"]["ZIPCd"],
						)
				end
				puts "Loading data for Filer: #{filer.ein} - #{filer.name}"

				timestamp = data["ReturnHeader"]["ReturnTs"] ? data["ReturnHeader"]["ReturnTs"] : nil
				amended = data["ReturnData"]["IRS990"] && data["ReturnData"]["IRS990"]["AmendedReturnInd"] ? true : false

				filing = Filing.create(
						filer: filer,
						return_timestamp: timestamp,
						amended_return: amended
					)

				# Handing scenario where one of the input files is a different type of filing unrelated to Awards
				if data["ReturnData"]["IRS990ScheduleI"]
					data["ReturnData"]["IRS990ScheduleI"]["RecipientTable"].each do |item|
						# Handling strange scenario where an award is in the data but only contains "PurposeOfGrantTxt" and no other data
						if item["RecipientBusinessName"]
							recipient = Organization.where('ein = ?', item["RecipientEIN"]).first
							unless recipient
								recipient = Organization.create(
									ein: item["RecipientEIN"],
									name: item["RecipientBusinessName"]["BusinessNameLine1Txt"],
									address: item["USAddress"]["AddressLine1Txt"],
									city: item["USAddress"]["CityNm"],
									state: item["USAddress"]["StateAbbreviationCd"],
									zip: item["USAddress"]["ZIPCd"],
								)
							end

							# Create Award
							award = Award.create(
									filing: filing,
									recipient: recipient,
									amount: item["CashGrantAmt"].to_d,
									tax_period: data["ReturnHeader"]["TaxPeriodEndDt"],
									purpose: item["PurposeOfGrantTxt"]
								)
						end
					end
				else
					# Normally we would create some other handling here for different type of filing
					puts "This Filing is not IRS990ScheduleI"
				end

			else
				# Error in the intake url or response
			end
		end

	end

end