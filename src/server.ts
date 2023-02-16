import App from "./app";
import AdminRoute from "./routes/admin.route";


const app = new App([
    new AdminRoute()
])



app.listen()