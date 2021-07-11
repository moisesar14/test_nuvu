const { Router } = require('express');
const fs = require('fs');
const router = Router();

const json_data = fs.readFileSync('src/data.json', 'utf-8');
const objData = json_data == "" ? [] : JSON.parse(json_data);

router.post('/', (req, res) =>{

    const { token } = req.body;

    if (!token) {
        res.json({Error: "Debe ingresar el token."});
    } else {
        if (token == "") {
            res.json('POR FAVOR INGRESE EL TOKEN!')
        } else {
            const data =  objData.filter( usuario => usuario.token === token );
            console.log(data);
            if (data.length > 0) {
                res.json(data);
            } else {
                res.json({Error: "El token es inconrrecto."});
            }
        }
    }
});

module.exports = router;