const cds=require('@sap/cds')
module.exports=cds.service.impl(async function()
{

    const openApi=await cds.connect.to('openApi')
    this.on('searchPlace',async(req)=>{
     const{city}=req.data;
     const result = await openApi.send({
            method: 'GET',
            path: `/search?q=${encodeURIComponent(city)}&format=json`
        });
        return result
})

})