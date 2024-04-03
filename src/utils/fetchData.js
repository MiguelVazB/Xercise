export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
}

export const fetchData = async(url, options) => {

    const response = await fetch(url, options);

    try {
        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

export const videoOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
    }
}

export const fetchVideoData = async(url, options) => {
    const response = await fetch(url, options);

    const data = await response.json()

    return data
}