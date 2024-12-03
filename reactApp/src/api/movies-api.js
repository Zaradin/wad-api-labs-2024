export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=ead0d8697b6ad0cfd933f243a5eec92d&language=en-US&include_adult=false&page=1`
    );
    return response.json();
};
