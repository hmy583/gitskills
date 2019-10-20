function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $('#number-cell-'+ i + '-' +j);
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
    	width:"100px",
    	height:"100px",
    	top:getPosTop(i,j),
    	left:getPosLeft(i,j)
    },50);
}

function showAnimation(formx,formy,tox,toy){
    var numberCell = $('#number-cell-'+ formx +'-'+formy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(toy,toy)
    },200);
}

function updateScore( score ){
    $('#score').text( score );
}
