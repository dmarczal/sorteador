var chosen = new Array();
var numbers = [76, 182, 297]; //new Array();
var winners = new Array();
var winner = "Desconhecido";

var start = 1;
var end = 21;
var delay = 2200;

$().ready(function() {

  $("#sortear").click(function(){

     $('#sound_element').html(
        "<embed src='mp3/bau_da_felicidade.mp3' hidden=true autostart=true loop=false>");

     $("#winner").html("");
     setTimeout("init_raffle()", 1050);
  });
});

function init_raffle(){
     rotate("u");
     rotate("d");
     rotate("c");

     var number = 0;

     $("#sortear").hide();
     $("#result").html("");

     do{
       number = sortear();
     }while(contains(number));

     chosen.push(number);
     splitUDC(number);
     show_in_time(number);
     find_name(number);
}

function find_name(numero){
   $.ajax({
       type: "GET",
	   url: "inscritos/inscritos.xml",
	   dataType: "xml",
	   success: function(xml) {
               //alert(xml);
               $(xml).text();
               winner = "Desconhecido";
               $(xml).find('name').each(function() {
                  var id = $(this).attr('id');
                  if(numero == id){
                    //alert($(this).text());
                    winner = $(this).text();
                    winners.push(winner);
                  }

               });
           }
   });
}

function rotate(obj){
  $("#"+obj).everyTime(80, obj, function() {
    $(this).html(rand_with(0,9));
  });
}

function splitUDC(number){
   numbers[0] = number % 10;
   numbers[1] = Math.floor(number % 100 / 10);
   numbers[2] = Math.floor(number / 100);
}

function contains(x){
  for(i=0; i < chosen.length; i++)
    if (x == chosen[i])
       return true

  return false;
}

function sortear(){
  return rand_with(start, end);//Math.floor(Math.random() * end + start);
}

function rand_with(i, e){
  return Math.floor(Math.random() * e + i);
}

function show_in_time(number){

  setTimeout("show_number('u', "+ numbers[0] +")", (delay+1000));
  setTimeout("show_number('d', "+ numbers[1] +")", (delay+3000));
  setTimeout("show_number('c', "+ numbers[2] +")", (delay+5000));

  setTimeout("show_chosen("+number+")", delay+5500);
  setTimeout("show_button()", delay+5000);
}

function show_button(){
   $("#sortear").show();
}

function show_chosen(number){
  $("#winner").html(winner);
  $("#chosen").prepend(number +" "+winner + "<br />");
  // stop sound
  $('#sound_element').html("");
}

function show_number(obj, n){
  $("#"+obj).stopTime(obj);
  $("#"+obj).html(n);
}

//alert('oi');
