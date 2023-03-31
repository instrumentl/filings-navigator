import ErrorDisplay from '@/components/errorDisplay'

const getErrorData = (error: any) => {
  if (error.status === "PARSING_ERROR" || error.status === "FETCH_ERROR") {
    return {
      errorMsg: error.error,
      errorStatus: error.status
    }
  } else if (error?.data?.error && error?.status) {
    return {
      errorMsg: error.data.error,
      errorStatus: error.status
    }
  } else if (error.name) {
    return {
      errorMsg: error.message,
      errorStatus: error?.code || "Unknown"
    }
  } else {
    return {
      errorMsg: JSON.stringify(error),
      errorStatus: "Unknown"
    }
  }
}

export const displayError = (error: any) => {
  const { errorMsg, errorStatus } = getErrorData(error)

  return <ErrorDisplay
    message={errorMsg}
    status={errorStatus}
  />
}  