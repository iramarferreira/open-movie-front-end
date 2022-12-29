export default interface Movie{
    imdbID?: string,
    title?: string,
    year?: string,
    image?: string,
    genre?: string[],
    isFavorite?: boolean,
    hasReview?: boolean,
    myReview?: string,
    myStars?: number

}