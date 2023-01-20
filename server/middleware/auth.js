import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({
                message: "No token provided!"
            });
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        } else {
            return res.status(403).json({
                message: "No token provided!"
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;

        next();

    } catch (error) {
        //TODO: Handle error properly
        res.status(403).json({
            message: "No token provided!"
        });
    }

}