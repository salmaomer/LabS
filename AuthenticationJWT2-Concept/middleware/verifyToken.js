require("dotenv").config(); 
const jwt = require('jsonwebtoken');

/* Middleware Function */
/* next >> A Callback To Pass Control To The Next Middleware Or Route Handler. */
function RouteGuard(req, res, next) {
    /* Tries To Extract The Authorization Header From The Incoming Request. */
    const authHeader = req.headers["authorization"];

    /* If authHeader Exists, This Line splits It By A Space And Takes The Second Part, Which Should Be The Token Itself.
    If authHeader Doesn't Exist, It Sets tokenFromHeader To null. */
    const tokenFromHeader = authHeader ? authHeader.split(" ")[1] : null;
    /* Checks The Query String For A Token. */
    const tokenFromQuery = req.query.token;

    /* Chooses Whichever Token It Finds First — From The Header Or The Query String. */
    const token = tokenFromHeader || tokenFromQuery;
    
    /* If No Token Was Found At All */
    if (!token) {
        /* Responds With Status 401 Unauthorized */
        return res.status(401).send("No token provided, Access Denied");
    }

    try {
        /* Verify The Token With A Secret Key. */
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        /* If Verification Succeeds, It Attaches The Decoded User Info To req.user, So Future Middleware Or Routes Can Access It. */
        req.user = decode;

        /* Move To The Next Middleware Or Route Handler, Since The User Is Authenticated. */
        next();
    /* Catches The Error And Returns A 403 Forbidden Response. */
    } catch (error) {
        return res.status(403).send("Invalid or expired token");
    }
}

module.exports = RouteGuard;
