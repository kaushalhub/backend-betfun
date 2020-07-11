module.exports = {
    PORT : 4100,
    DB : 'mongodb+srv://casino:casino@cluster0-pstjj.mongodb.net/casino?retryWrites=true&w=majority',
    date_format: {
        ONE: 'dd-mm-yyyy hh:mm:ss',//5-12-2020 13:18:58
        TWO:'dd/mm/yyyy hh:mm:ss',//5/12/2020 13:18:58
        THREE: 'MMM dd, yyyy hh:mm:ss',//May 12, 2020 13:18:58
        FOUR: 'mm-dd-yyyy hh:mm:ss',
    },
    TIME_FRAME_TRENDING_QUERIES: 5,
}