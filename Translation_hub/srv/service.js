const cds = require('@sap/cds');
 
module.exports = cds.service.impl(async function () {
 
    const api = await cds.connect.to('translate');
 
    this.on('translation', async (req) => {
<<<<<<< HEAD
        const { res ,data} = req.data;
        console.log(res);
        
        try {
            
=======
        const { res } = req.data;
        try {
            const students = await SELECT.from('student');
            const translateData = students
                .map(s => {
                    const name = s.name ?? '';
                    const address = s.address ?? '';
                    return `[${name} , ${address}]`.trim();
                })
            if (!translateData) {
                return req.error(400, "No valid data to translate");
            }
>>>>>>> e3f906d (inserted)
 
            const result = await api.send({
                method: 'POST',
                path: `/api/v1/translation/?sourceLanguage=en-US&targetLanguage=${res}`,
                headers: {
                    'Content-Type': 'text/plain'
                },
<<<<<<< HEAD
                //data:data
                data:"Amala vasanthi,Sharanya,Partha"
=======
                data: translateData
>>>>>>> e3f906d (inserted)
            });
 
            console.log("API response:", result);
           
<<<<<<< HEAD
            const output = Buffer.from(result.data,'base64').toString('utf-8');
=======
            const output = Buffer.from(result.data, 'base64').toString('utf-8');
>>>>>>> e3f906d (inserted)
 
            return output;
        } catch (err) {
            console.error("Translation Error:", err);
            return err.message;
        }
    });
});