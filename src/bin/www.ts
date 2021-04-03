import app from "../app";
const port = 3000;

app.listen(port || 3001, () => {
    return console.log(`server is listening on ${port}`);
});