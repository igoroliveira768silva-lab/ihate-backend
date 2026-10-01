import http from "http";
let dados = [];
//cria a variavel http das requisições.
let server = http.createServer((req,res)=>{
    res.setHeader("Content-Type","application/json");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","POST,GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Authorization")
    if(req.method === "OPTIONS"){
        res.statusCode = 204;
        res.end();
    }
    //para mandar postagens legais.
    else if(req.method === "POST"){
        let data_ruim = "";
        req.on("data",(chunk)=>{
            data_ruim += chunk;
        });
        req.on("end",()=>{
            let dados_limpos = JSON.parse(data_ruim);
            dados.push(dados_limpos);
            res.statusCode = 200;
            res.end(JSON.stringify({mensagem:"dados salvos com sucesso"}));
        });
    }
    //para pegar os dados das postagens
    else if (req.method === "GET") {
        res.statusCode = 200;
        res.end(JSON.stringify(dados));
    }

});
//fica escutando o servidor nessa porta.
server.listen(3001,()=>{
    console.log("api rodando pra carambaaaaaa");
});