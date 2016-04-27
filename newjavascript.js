
function Chip (nominal){this.nominal = nominal;}
function Chips_storage ()
{
    this.storage =
    {
        1:   [], //array objects type of chip
        5:   [],
        10:  [],
        20:  [],
        50:  [],
        100: []
    };
        
}
Chips_storage.prototype.add_chip_singl_nominal =  function(chip_nominal,number_chips)//chip_arr - array objects type of chip
{ 
    for (var i=1; i<=number_chips; i++){this.storage[chip_nominal].push(new Chip(chip_nominal));} 
};
Chips_storage.prototype.add_chip_diferent_nominal =  function(chip_arr)//chip_arr - array objects type of chip
{ 
    for (var i=0; i<chip_arr.length; i++){this.storage[chip_arr[i].nominal].push(chip_arr[i]);} 
};
Chips_storage.prototype.take_chip_singl_nominal =  function(chip_nominal,number_chips) //chip_arr - array objects type of chip
{
    var ret_arr = [];
    for (var i=1; i<=number_chips; i++){ret_arr.push(this.storage[chip_nominal].pop());}
    return ret_arr;
};
Chips_storage.prototype.take_chip_diferent_nominal =  function(chip_arr) //chip_arr - array objects type of chip
{
    var ret_arr = [];
    for (var i=0; i<chip_arr.length; i++){ret_arr.push(this.storage[chip_arr[i].nominal].pop());}
    return ret_arr;
};
Chips_storage.prototype.change_chip_nominal = function(chip_object, need_nominal)
{
    if(this.storage[chip_object.nominal].length == 0) {return false;}
    this.storage[chip_object.nominal].pop();
    var n = chip_object.nominal / need_nominal;
    for (var i=0; i<n; i++){this.storage[need_nominal].push(new Chip(need_nominal));}
}
Chips_storage.prototype.cleaning_nominal =  function(chip_nominal)//chip_arr - array objects type of chip
{ 
   this.storage[chip_nominal] = [];
};




function Game(player_obj,casino_obj)
{
    this.player = player_obj;
    this.casino = casino_obj;
    this.random_range = {min: 0, max: 2};
    this.show_current_state = function (){show_current_state(this);};
    this.bet = function(){bet(this)};
}
Game.prototype.stake =new Chips_storage (); // кон, банк текущей партии, массив объектов типа chip
Game.prototype.plaer_suit = 0; //  текущая масть игрока
Game.prototype.casino_suit = 0; //  текущая масть казино
Game.prototype.time_win = "undefined";//победитель тайма, тайм часть партии
Game.prototype.party_win = "undefined";//победитель партии,партия состоит из таймов
Game.prototype.move = function(game_object){ return RND(game_object.random_range['max']);};


function Player (){}
Player.prototype.chips_deposit  = new Chips_storage ();
Player.prototype.chips_wallet = new Chips_storage ();
Player.prototype.chips_wallet.add_chip_singl_nominal(1,5);


function Casino (){}
Casino.prototype.chips_deposit  = new Chips_storage ();
Casino.prototype.chips_wallet = new Chips_storage ();
Casino.prototype.chips_wallet.add_chip_singl_nominal(1,5);

make_table(); make_score_table()

var player = new Player();
var casino = new Casino();
var gm = new Game(player,casino);

gm.bet();

var set_cnt = 1; // номер текущего сета
var player_set_win_cnt = 0; // количество выигранных сетов у игрока
var casino_set_win_cnt = 0; // количество выигранных сетов у казино
var win_match_flag = 0;
var event_cnt = 0; // 1-point, 2-game, 3-set or match
colon_text_green(set_cnt); // текущий столбей красным

gm.show_current_state();

$(document).on("click",".player_cards",
    function()
    {
      
       $(".cur_info").hide(); var difference = 0; event_cnt = 0;
       
      if(time_play(this) != "undefined") // кто то выиграл партию
      {
        
          if(gm.party_win == "player")
          {
              player.chips_deposit.add_chip_singl_nominal(1,5); 
              
              var ttInt = parseInt($("#t3 tr:eq(1) th:eq("+(2*set_cnt)+")").text(),10);  ttInt++;
              $("#t3 tr:eq(1) th:eq("+(2*set_cnt)+")").text(ttInt.toString());
              
              player.chips_wallet.take_chip_singl_nominal(1,5);
              casino.chips_wallet.add_chip_singl_nominal(1,5);
              gm.bet();
              gm.show_current_state();
              
              difference = gm.player.chips_deposit.storage['1'].length - gm.casino.chips_deposit.storage['1'].length;
             
             if((gm.player.chips_deposit.storage['1'].length < 30)||((gm.player.chips_deposit.storage['1'].length >= 30)&&(difference < 10)))
             {
                  make_info_p_text("you won game, play new game"); event_cnt++;
             }
             if((gm.player.chips_deposit.storage['1'].length >= 30)&&(difference >= 10))
             {
                  player_set_win_cnt++;
                  set_match_win("player");
                  event_cnt += 2;
             }
              
          }
          if(gm.party_win == "casino")
          {
             casino.chips_deposit.add_chip_singl_nominal(1,5); 
             
              var ttInt = parseInt($("#t3 tr:last th:eq("+(2*set_cnt)+")").text(),10);  ttInt++;
              $("#t3 tr:last th:eq("+(2*set_cnt)+")").text(ttInt.toString());
              
             casino.chips_wallet.take_chip_singl_nominal(1,5);
             player.chips_wallet.add_chip_singl_nominal(1,5);
             gm.bet();
             gm.show_current_state();
             
             difference = gm.casino.chips_deposit.storage['1'].length - gm.player.chips_deposit.storage['1'].length;
             
            if((gm.casino.chips_deposit.storage['1'].length < 30)||((gm.casino.chips_deposit.storage['1'].length >= 30)&&(difference < 10)))
            {
                make_info_p_text("you lost the game, play a new game"); event_cnt++;
            }
            if((gm.casino.chips_deposit.storage['1'].length >= 30)&&(difference >= 10))
            {
                 casino_set_win_cnt++;
                 set_match_win("casino");
                 event_cnt += 2;
                
            }

             
          }
      }
      
      if(event_cnt == 1){make_sound("beep1.mp3");}
      if(event_cnt == 2){make_sound("beep9.mp3");}
      if(event_cnt == 3){make_sound("beep7.mp3");}
     
    }
); 

$(".player_cards").on({
     mouseenter: function()
    {
       $(".player_cards").not("#" + this.id).fadeTo(1, 0.3);
       
       $(".cur_info").hide();
       
    },
    mouseleave: function()
    {
        $(".player_cards").not("#" + this.id).fadeTo(1,1.0);
        $(".casino_cards").fadeTo(1,0.3);
        
//        $(".cur_info").hide();

    }
});
    

$('#t4 tr:eq(0) th:eq(2),#t4 tr:eq(0) th:eq(4)').on({
     mouseenter: function()
    {
       $(this).css({color:"red"});
    },
    mouseleave: function()
    {
        $(this).css({color:"black"});
    }
});  


 /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#t4 tr:eq(0) th:eq(2),#t4 tr:eq(0) th:eq(4)').click( function(){ // лoвим клик пo крестику или пoдлoжке
            $('#t4')
                    .animate({opacity: 0, top: '5%'}, 300,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
                            function(){ // пoсле aнимaции
                                    $(this).css('display', 'none'); // делaем ему display: none;
                                    $('#overlay').fadeOut(400); // скрывaем пoдлoжку
                            }
                    );
            $("#player_cur_info").hide(); 
            $("#casino_cur_info").hide();
            if(win_match_flag == 1){win_match_reset();}
    });



make_about_text();

$(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
	$('a#go').click( function(event){ // лoвим клик пo ссылки с id="go"
		event.preventDefault(); // выключaем стaндaртную рoль элементa
		$('#overlay_about').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function(){ // пoсле выпoлнения предъидущей aнимaции
				$('#modal_form') 
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1, top: '50%'}, 300); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		});
	});
	/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
	$('#modal_close, #overlay_about').click( function(){ // лoвим клик пo крестику или пoдлoжке
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 300,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function(){ // пoсле aнимaции
					$(this).css('display', 'none'); // делaем ему display: none;
					$('#overlay_about').fadeOut(400); // скрывaем пoдлoжку
				}
			);
	});
});




function time_play(li_input_obj)
{
      event_cnt++;  

      gm.party_win = "undefined";//победитель партии,партия состоит из таймов
      
      time_winner (li_input_obj);
      
      if(gm.time_win == "draw")
      {
          gm.bet();
          //alert("draw, play again");
          $("#player_cur_info").text("draw, play again").show();$("#casino_cur_info").hide();
          
      }
      if(gm.time_win == "player")
      {
         
           
          gm.player.chips_wallet.add_chip_singl_nominal(1, gm.stake.storage['1'].length); 
          gm.stake.storage['1'] = [];
          if(gm.casino.chips_wallet.storage['1'].length == 0)
          { 
             gm.party_win = "player"; 
             //alert("party_win = " + gm.party_win);
             
          }
          if((gm.player.chips_wallet.storage['1'].length > 0)&&(gm.casino.chips_wallet.storage['1'].length > 0))
          {
              gm.bet();
          }
          
          
         
      }
      if(gm.time_win == "casino")
      {
          
           
          gm.casino.chips_wallet.add_chip_singl_nominal(1, gm.stake.storage['1'].length); 
          gm.stake.storage['1'] = [];
          if(gm.player.chips_wallet.storage['1'].length == 0) 
          {
              gm.party_win = "casino"; 
             //alert("party_win = " + gm.party_win);
              
          }
          if((gm.player.chips_wallet.storage['1'].length > 0)&&(gm.casino.chips_wallet.storage['1'].length > 0))
          {
             gm.bet();
          }
         
          
         
      }
      
      gm.show_current_state();
      
//      $("#test1").text("tw = " + gm.time_win + "  pw = " + gm.party_win).show();
     
      return gm.party_win;
}
function time_winner (li_input_obj)
{
      gm.time_win = "undefined";//победитель тайма, тайм часть партии
      //gm.party_win = "undefined";//победитель партии,партия состоит из таймов
      
      gm.plaer_suit = parseInt(li_input_obj.value);
      $(".player_cards").not("#" + li_input_obj.id).fadeTo(1,0.3);
      
      gm.casino_suit = gm.move(gm);
      if(( gm.plaer_suit == gm.casino_suit)&&((gm.player.chips_wallet.storage['1'].length == 0)||(gm.casino.chips_wallet.storage['1'].length == 0)))
      {
          while(gm.plaer_suit == gm.casino_suit){gm.casino_suit = gm.move(gm);}
      }
      $("#casino_cards_" + gm.casino_suit).fadeTo(1,1.0);
      $(".casino_cards").not("#casino_cards_" + gm.casino_suit).fadeTo(1,0.3);
      
      switch (gm.plaer_suit) {
        case 0:
            if(gm.casino_suit == 0){gm.time_win = "draw";}
            if(gm.casino_suit == 1){gm.time_win = "casino";}
            if(gm.casino_suit == 2){gm.time_win = "player";}
            break;
        case 1:
            if(gm.casino_suit == 0){gm.time_win = "player";}
            if(gm.casino_suit == 1){gm.time_win = "draw";}
            if(gm.casino_suit == 2){gm.time_win = "casino";}
            break;
        case 2:
            if(gm.casino_suit == 0){gm.time_win = "casino";}
            if(gm.casino_suit == 1){gm.time_win = "player";}
            if(gm.casino_suit == 2){gm.time_win = "draw";}
            break;
        default:
            gm.time_win = "undefined";
        }
    
      //alert("player_suit = " + gm.plaer_suit + " casino_suit = " + gm.casino_suit + " gm.time_win = " + gm.time_win);
      
      if(gm.time_win == "player"){$("#player_cur_info").text("you are point winner").show();$("#casino_cur_info").hide();}
      if(gm.time_win == "casino"){$("#casino_cur_info").text("casino is point winner").show();$("#player_cur_info").hide();}
      
//      $("#test").text("tw = " + gm.time_win + "  pw = " + gm.party_win).show();
      
      return gm.time_win;
}



