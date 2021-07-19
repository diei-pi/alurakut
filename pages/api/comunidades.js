import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request,response){
    if(request.method === 'POST'){
        const TOKEN = 'ec4d148de52ec2d5f0f13704bc9c32';
        const client = new SiteClient(TOKEN);
        

        //importante validar os dados antes de cadastrar
        const registroCriado = await client.items.create({
            itemType: "975377", //id do model "communities" criado pelo dato
            ...request.body,
        })
    
        console.log(registroCriado);
        
        response.json({
            registroCriado: registroCriado,
        })
        return;
    }
    response.status(404).json({
        message:'Ainda não tem nada no GET,mas no POST tem!',
    })
}