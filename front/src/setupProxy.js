const { createProxyMiddleware } = require("http-proxy-middleware");




module.exports = (app) => {
    app.use(
        createProxyMiddleware("/posts", {
            target: "http://43.202.90.230",
            changeOrigin: true,
        })
    );

    


    app.use(
        createProxyMiddleware("/users", {
            target: "http://43.202.90.230",
            changeOrigin: true,
        })
    );
    
    app.use(
        createProxyMiddleware("/families", {
            target: "http://43.202.90.230",
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware("/comments", {
            target: "http://43.202.90.230",
            changeOrigin: true,
        })
    );
    

};
