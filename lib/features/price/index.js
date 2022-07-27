import Price from "@models/Price"

export const connect = async(req, res) => {
    switch (req.method) {
        case "POST":
            try{
                await db();

                const price = new Price (req.body);
            
                await price.save();
                return res.status(201).json({
                    success: true,
                    price,
                });
            }catch(er){
                console.error(er);
                const fieldFailed = Object.keys(er.keyValue)[0]; 
                return res.status(401).json({
                    success: false,
                    error: `There is another user with the same ${fieldFailed}, please change it`
                })
            }
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}