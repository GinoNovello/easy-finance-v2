interface NextParams {
    params: {slug: string}
}

interface NextSearchParams {
    searchParams?: { 
        [key: string]: string | string[] | undefined 
    }
}

interface NextSSRParams extends NextParams, NextSearchParams {}