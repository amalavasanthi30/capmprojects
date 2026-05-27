const cds = require('@sap/cds');
 
module.exports = cds.service.impl(async function () {
 
    const api = await cds.connect.to('translate');
 
    this.on('translation', async (req) => {
        const { res ,data} = req.data;
        console.log(res);
        
        try {
            
 
            const result = await api.send({
                method: 'POST',
                path: `/api/v1/translation/?sourceLanguage=en-US&targetLanguage=${res}`,
                headers: {
                    'Content-Type': 'text/plain'
                },
                //data:data
                data:"Amala vasanthi,Sharanya,Partha"
            });
 
            console.log("API response:", result);
           
            const output = Buffer.from(result.data,'base64').toString('utf-8');
 
            return output;
        } catch (err) {
            console.error("Translation Error:", err);
            return err.message;
        }
    });
});