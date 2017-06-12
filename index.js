//Comando para evitar erros relacionados a portas no heroku
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

//Requer a api do telegram que funciona com node
var TelegramBot = require('node-telegram-bot-api'),
// Token do bot gerado pelo telegram
telegram = new TelegramBot("TOKEN", { polling: true });
var sabor='';
var tamanho='';
var acompanhamento='';
var preco;

function mandarPedido(t, s, a, p, id){
var produto='Pizza '+t+' de '+s;
telegram.sendMessage(id, p);
  if (a==''){
    telegram.sendInvoice(id, produto, produto, 'TestPagg', 'TOKENPAG', 'teste', 'USD', [{amount: p, label: produto }, {amount: 000, label: "PriceLabel_2"}]);  
  //photo: , need: {name:true, phoneNumber:true, email:true, shippingAddress:true}, isFlexible:false}
  }
  else{
    telegram.sendInvoice(id, 'Combo', 'Combo Pizza + Refrigerante', 'TestPagg', 'TOKENPAG', 'teste', 'USD', [{amount: p, label: produto }, {amount: 000, label: acompanhamento}]);  
  }
}

telegram.on("text", (message) => {
  if(message.text.toLowerCase().indexOf("/start")!== -1){
      telegram.sendMessage(message.chat.id, "WARNING!\nThis Bot is being tested, please do not make any operation here!");
      telegram.sendMessage(message.chat.id, "AVISO!\nEsse robô está sendo testado, por favor não realize nenhuma operação aqui!");
      telegram.sendMessage(message.chat.id, "Oi, tudo bem? Pode me dizer seu CEP?");
  }
  else if(message.text.toLowerCase().indexOf("88050")!== -1){
      telegram.sendMessage(message.chat.id, "Legal! Atendemos nessa região :)\nO que você gostaria de pedir?");
  }
  else if(message.text.toLowerCase().indexOf("pizza")!== -1){
    telegram.sendMessage(message.chat.id, "Pode me dizer o sabor da pizza? ");
    }
  else if(message.text.toLowerCase().indexOf("calabresa")!== -1){
    sabor=message.text.toLowerCase();
    telegram.sendMessage(message.chat.id, "Qual o tamanho?");
  }
  else if(message.text.toLowerCase().indexOf("grande")!== -1){
    tamanho=message.text.toLowerCase();
    telegram.sendMessage(message.chat.id, "Refrigerante?");
  }
  else if (message.text.toLowerCase().indexOf("sim")!== -1){
    if (acompanhamento==''){
    telegram.sendMessage(message.chat.id, "Qual?");
    }
    else{
      mandarPedido(tamanho, sabor, acompanhamento, preco, message.chat.id);
    }
  }
  else if (message.text.toLowerCase().indexOf("não")!== -1 || message.text.toLowerCase().indexOf("nao")!== -1){
    telegram.sendMessage(message.chat.id, "Desculpe :(\n O que você gostaria de pedir então?");    
    preco=0;
    sabor='';
    tamanho='';
    acompanhamento='';
  }
  else if (message.text.toLowerCase().indexOf("coca")!== -1){
      acompanhamento='Coca-cola';
      telegram.sendMessage(message.chat.id, "Entendi!\nTemos as seguintes pizzarias:\n1 - Pizzaria da Mama (R$2,00)\n2 - Don Guaianases (R$35,00) \n3 - Cadiolli (R$70,00)\n\nSelecione a que desejar!");    
  }
  else if (message.text.toLowerCase().indexOf("1")!== -1){
      if (acompanhamento==''){
        var mensagem="Confirma pra mim então:\n 1 - Pizza "+tamanho+" de "+sabor;
        preco=100;
        telegram.sendMessage(message.chat.id, mensagem);    
      }
      else{
        preco=200;
        telegram.sendMessage(message.chat.id, "Confirma pra mim então:\n1 - Pizza "+tamanho+" de "+sabor+"\n2 - "+acompanhamento);
      }
    telegram.sendMessage(message.chat.id, "É isso mesmo?!");
  }
  else if (message.text.toLowerCase().indexOf("2")!== -1){
      if (acompanhamento=''){
        preco=3000;
        telegram.sendMessage(message.chat.id, "Confirma pra mim então:\n1 - Pizza "+tamanho+" de "+sabor);    
      }
      else{
        preco=3500;
        telegram.sendMessage(message.chat.id, "Confirma pra mim então:\n1 - Pizza "+tamanho+" de "+sabor+"\n2 - "+acompanhamento);
      }
    telegram.sendMessage(message.chat.id, "É isso mesmo?!");      
  }
  else if (message.text.toLowerCase().indexOf("3")!== -1){
      if (acompanhamento=''){
        preco=6500;
        telegram.sendMessage(message.chat.id, "Confirma pra mim então:\n1 - Pizza "+tamanho+" de "+sabor);    
      }
      else{
        preco=7000;
        telegram.sendMessage(message.chat.id, "Confirma pra mim então:\n1 - Pizza "+tamanho+" de "+sabor+"\n2 - "+acompanhamento);
      }
    telegram.sendMessage(message.chat.id, "É isso mesmo?!");      
  }
  else if (message.text.toLowerCase().indexOf("/stop")!== -1){
    new StopController()
  }
  else{
  	telegram.sendMessage(message.chat.id, "Desculpe, não entendi o que quis dizer :(");	
  }
});