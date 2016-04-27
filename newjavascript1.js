function make_table()
{
  //document.write('<div id="cnt">');
  
  var gf_fill = $('<img/>',{
                            src: "fill.jpg", 
                            style: "width: 80%; height: 80%; position: absolute; left: 5%; top: 5%; z-index: 2;"
                         });
 $('#cnt').append(gf_fill);     

 for (var i=0; i<10; i++)
 {
     var sh = 9;
     var shift = i*5 + sh;
     $('#cnt').append( $('<img/>',{
                             class: "player_wallet",
                             src: "chip.svg", 
                             style: "width: 10%; height: 10%; display: inline; position: absolute; left: "+shift+"%; top: 6%; z-index: 3;"
                          }));
                          
     $('#cnt').append( $('<img/>',{
                             class: "casino_wallet",
                             src: "chip.svg", 
                             style: "width: 10%; height: 10%; display: inline; position: absolute; left: "+shift+"%; top: 74%; z-index: 3;"
                          }));                     
                    
 }

var indx =0;
for (var i=0; i<5; i++)
 {
     var sh = 19;
     var shift = i*3 + sh;
     $('#cnt').append( $('<img/>',{
                             class: "player_stake",
                             id:  "player_stake_" + indx,
                             src: "chip.svg", 
                             style: "width: 10%; height: 10%; display: inline; position: absolute; left: 3%; top: "+shift+"%; z-index: 3;"
                          }));
                          
     $('#cnt').append( $('<img/>',{
                             class: "casino_stake",
                             id:  "casino_stake_" + indx,
                             src: "chip.svg", 
                             style: "width: 10%; height: 10%; display: inline; position: absolute; left: 3%; top: "+(shift+31)+"%; z-index: 3;"
                          }));
                          
      indx++;                     
                    
 }





var rang = ['2','7','A']; var lft = 30; indx =0;
$.each(rang,function( myIndex, myData ){
    lft += 9;
    $('#cnt').append(
                     $('<img/>',{
                               class: "player_cards",
                               id: "player_cards_" + indx,
                               src: myData + "H.gif",
                               value: indx,
                               style: "width: 8%; height: 25%; display: inline; position: absolute; left: "+lft+"%; top: 18%; z-index: 3;"
                            })
                 ); 
         
    $('#cnt').append(
                     $('<img/>',{
                               class: "casino_cards",
                               id: "casino_cards_" + indx,
                               src: myData + "H.gif", 
                               style: "width: 8%; height: 25%; display: inline; position: absolute; left: "+lft+"%; top: 48%; z-index: 3;"
                            })
                 ); 
         
    indx++;
});


 
 
 
   
 
}



function make_score_table()
{
    var TableTitle = ["set number"," ","1","   ","2","   ","3","   ","4","   ","5"];
    var mytable = $('<table/>',{
                                class:'transp',
                                id:'t3',
                                name:'t3',
                                style: "position: absolute; left: 70%; top: 36%; z-index: 4; font-size: 100%;"
                                }).append(
                                        $('<thead/>'),
                                        $('<tbody/>')
                        );
                
    var TitleCell = $('<tr/>');
    $.each(TableTitle,function( myIndex, myData ) {
            TitleCell.append(
                    $('<th/>',{
                            text:myData
                          
                    })
            );
    });
    $('thead',mytable).append(TitleCell);

    

    var DataCell_1 = $('<tr/>'); var txt = ""; 

    $.each(TableTitle,function(myIndex) {
        if(myIndex == 0){txt = "player games"}
        if((myIndex > 0)&&((myIndex % 2) == 1)){txt = " ";}
        if((myIndex > 0)&&((myIndex % 2) == 0)){txt = "0";}

                DataCell_1.append
                (
                  $('<th/>',{text: txt})
                );
    }); 
    $('tbody',mytable).append(DataCell_1);
    
    
   for(var i = 0; i<4; i++)
   {
        var DataCell_tr = $('<tr/>'); 
        $.each(TableTitle,function(myIndex) {DataCell_tr.append($('<th/>'));});
        $('tbody',mytable).append(DataCell_tr);
   }
    
   
    
    
    var DataCell_2 = $('<tr/>'); 

    $.each(TableTitle,function(myIndex) {
         if(myIndex == 0){txt = "casino games"}
         if((myIndex > 0)&&((myIndex % 2) == 1)){txt = " ";}
         if((myIndex > 0)&&((myIndex % 2) == 0)){txt = "0";}

                DataCell_2.append
                (
                  $('<th/>',{text: txt})
                );
    }); 
    $('tbody',mytable).append(DataCell_2);
    
    
    
    var TableTitle_1 = ["set number"," ","<ok>"," \u00A0","<no>"];
    var mytable_1 = $('<table/>',{
                                class:'transp',
                                id:'t4',
                                name:'t4',
                                style: "position: absolute; left: 39%; top: 5%; z-index: 6; opacity: 0; font-size: 125%;"
                                }).append(
                                        $('<thead/>'),
                                        $('<tbody/>')
                        );
                
    var TitleCell_1 = $('<tr/>');
    $.each(TableTitle_1,function( myIndex, myData ) {
            TitleCell_1.append(
                    $('<th/>',{
                            class: 'blink',
                            text:myData,
                            id:myIndex
                          
                    })
            );
    });
    $('thead',mytable_1).append(TitleCell_1);

    


    $('#cnt').append(mytable);
    $('#cnt').append(mytable_1);
    
   $("#t4 tr:eq(0) th:eq(0)").css({"cursor":"default"});  
   $("#t4 tr:eq(0) th:eq(2)").css({"cursor":"pointer"})
   $("#t4 tr:eq(0) th:eq(3)").css({"cursor":"default"});  ; 
   $("#t4 tr:eq(0) th:eq(4)").css({"cursor":"pointer"}); 
}


function RND (modul) // генератор случайных чисел выдает случайные целые, неповторяющиеся числа от 0 до modul с периодом, равным 7 миллионам
{
        var val;
        var maxValue = 2147483647;
        var k = 1220703125;
        var b = 7;
        var m;
      
        m = modul + 1;
        var s = Date.now().toString();
        s = s.substr(s.length-3,3);
        val = parseInt(s);

        val = ((k * val + b) % maxValue);
        return val % m;
        
}

function bet(obj)
{
    obj.stake.add_chip_singl_nominal(1,2);
    obj.player.chips_wallet.take_chip_singl_nominal(1,1);
    obj.casino.chips_wallet.take_chip_singl_nominal(1,1);
}

function show_current_state(obj)
{
    $("#player_stake").html("player stake = " + (obj.stake.storage['1'].length / 2));
    $("#casino_stake").html("casino stake = " + (obj.stake.storage['1'].length / 2));
    $("#player_wallet").html("player wallet = " + obj.player.chips_wallet.storage['1'].length);
    $("#casino_wallet").html("casino wallet = " + obj.casino.chips_wallet.storage['1'].length);
   
    
    
    $(".player_stake").show();  $(".casino_stake").show();
    $(".player_stake").slice(0,(5 - obj.stake.storage['1'].length / 2)).hide();
    $(".casino_stake").slice(obj.stake.storage['1'].length / 2).hide();
    
    
    $(".player_wallet").show(); $(".casino_wallet").show();
    $(".player_wallet").slice(obj.player.chips_wallet.storage['1'].length).hide();
    $(".casino_wallet").slice(obj.casino.chips_wallet.storage['1'].length).hide();
    
    if($(".player_deposit").length > 0){$(".player_deposit").remove();}

}

function colon_text_green(set_number)
{
    var set_win = $("[set_win=1]");
   
    $("#t3").find("tr").find("th:eq("+(2*set_number)+")").css({"color":"#01fe91"});
    $("#t3").find("tr").find("th:not(:eq("+(2*set_number)+"))").css({"color":"black"});
    set_win.css({"color":"red"});

}
function set_match_win(winner)
{
    gm.player.chips_deposit.storage['1'] = [];
    gm.casino.chips_deposit.storage['1'] = [];
    if((set_cnt >= 3)&&((player_set_win_cnt == 3)||(casino_set_win_cnt == 3)))
    {
        win_match_flag = 1;
        set_cnt++;
        if(winner == "player")
        {
           set_win_red("player");
           make_info_p_text("you won game, set and match, play new match");
        }
        if(winner == "casino")
        {
            set_win_red("casino");
            make_info_p_text("you lost the game, set and match, play a new match");
        }

    }
    else
    {
        set_cnt++; 
        if(winner == "player")
        {
            set_win_red("player");
            make_info_p_text("you won game and set, play new set");
        }
        if(winner == "casino")
        {
            set_win_red("casino");
            make_info_p_text("you lost the game and set, play a new set");
        }
        colon_text_green(set_cnt); // текущий столбей светло зеленным
    }
    
    
}

function set_win_red(sw)
{
    if(sw =="player")
    {
        $("#t3").find("tr:eq(1)").find("th:eq("+(2*set_cnt - 2)+")").css({color:"red"});
        $("#t3").find("tr:eq(1)").find("th:eq("+(2*set_cnt - 2)+")").attr("set_win","1");
        
    }
    if(sw =="casino")
    {
        $("#t3").find("tr:last").find("th:eq("+(2*set_cnt - 2)+")").css({color:"red"});
        $("#t3").find("tr:last").find("th:eq("+(2*set_cnt - 2)+")").attr("set_win","1");
    }
}


function make_info_p_text(txt1)
{    
    $("#t4 tr:eq(0) th:eq(0)").text(txt1);
    $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function(){ // пoсле выпoлнения предъидущей aнимaции
                                $('#t4') 
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({opacity: 1, top: '10%'}, 300); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
                                
		});
    
}

function win_match_reset()
{
    set_cnt = 1; 
    player_set_win_cnt = 0;
    casino_set_win_cnt = 0;

    $("#t3").find("tr:eq(1)").find("th:even:not(:eq(0))").text("0");
    $("#t3").find("tr:last").find("th:even:not(:eq(0))").text("0");

    $("[set_win=1]").removeAttr("set_win");

    colon_text_green(set_cnt); // текущий столбей светло зеленным
    
    win_match_flag = 0;
    
}

function make_sound(file_name)
{
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = file_name; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем

}




function make_about_text()
{
    
    var txt_arr = [
        
        'Playing field above the blue strip for you, below for the casino.',
        'At the beginning of game you and casino get 5 chips(4 chips into wallets and 1 chips into the stake). Next play points.',
        'Click on any card (above the blue strip).',
        'Casino will randomly select his card (below the blue strip).',
        'Ace beats seven, seven beats deuce, but !!! deuce beats ace (A>>>7>>>2>>>A).',
        'The one whose card more wins the point and takes the chips from the bank.',
        'If the cards are equal then the bank increases and to play new point.',
        'Those who take all the chips at the opponent has, he wins the set.',
        'Set is played until  you or casino wins minimum 6 games, and that winner has a two-game lead over their opponent',
        'The set continues until you or casino wins the set by 2 games',
        'Your goal is to win the match. For this we need to win 3 sets.'
    ];
    
    
    var mylist = $('<ul/>',{id:'ul_1'});
    $.each(txt_arr,function( myIndex, myData ) {
        if(myIndex == 4){
            mylist.append($('<li/>',{text:myData,style:'color:red'}));
        }else{
            mylist.append($('<li/>',{text:myData}));
        }
                   
           
    });
    
 
    $('#modal_form').append(mylist);
}

