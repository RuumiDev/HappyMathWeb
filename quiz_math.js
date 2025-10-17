function CheckAnswer()
{
	var score=0;
	var ans1, ans2, ans3, ans4, ans5, ans6;
	ans1 = document.getElementsByName("Que1");
	ans2 = document.getElementsByName("Que2");
	ans3 = document.getElementsByName("Que3"); //dom
	ans4 = document.getElementsByName("Que4");
	ans5 = document.getElementsByName("Que5");
	ans6 = document.getElementsByName("Que6");
	
	for(var i = 0; i < 4; i++)
	{
		if(ans1[i].checked==true && (ans1[i].value=="True" || ans1[i].value=="true"))
		{
			score++;
			document.getElementById("answer1").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer1").className= "font-semibold text-lg quiz-correct";
		}
		
		if(ans1[i].checked==true && (ans1[i].value=="False" || ans1[i].value=="false"))
		{
			document.getElementById("answer1").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer1").className= "font-semibold text-lg quiz-wrong";
		}
		ans1[i].disabled = true;
		
		if(ans2[i].checked==true && (ans2[i].value=="True" || ans2[i].value=="true"))
		{
			score++;
			document.getElementById("answer2").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer2").className= "font-semibold text-lg quiz-correct";
		}

		if(ans2[i].checked==true && (ans2[i].value=="False" || ans2[i].value=="false"))
		{
			document.getElementById("answer2").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer2").className= "font-semibold text-lg quiz-wrong";
		}
		ans2[i].disabled = true;
		
		if(ans3[i].checked==true && (ans3[i].value=="True" || ans3[i].value=="true"))
		{
			score++;
			document.getElementById("answer3").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer3").className= "font-semibold text-lg quiz-correct";
		}

		if(ans3[i].checked==true && (ans3[i].value=="False" || ans3[i].value=="false"))
		{
			document.getElementById("answer3").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer3").className= "font-semibold text-lg quiz-wrong";
		}
		ans3[i].disabled = true;
		
		if(ans4[i].checked==true && (ans4[i].value=="True" || ans4[i].value=="true"))
		{
			score++;
			document.getElementById("answer4").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer4").className= "font-semibold text-lg quiz-correct";
		}

		if(ans4[i].checked==true && (ans4[i].value=="False" || ans4[i].value=="false"))
		{
			document.getElementById("answer4").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer4").className= "font-semibold text-lg quiz-wrong";
		}
		ans4[i].disabled = true;
		
		if(ans5[i].checked==true && (ans5[i].value=="True" || ans5[i].value=="true"))
		{
			score++;
			document.getElementById("answer5").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer5").className= "font-semibold text-lg quiz-correct";
		}

		if(ans5[i].checked==true && (ans5[i].value=="False" || ans5[i].value=="false"))
		{
			document.getElementById("answer5").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer5").className= "font-semibold text-lg quiz-wrong";
		}
		ans5[i].disabled = true;
		
		if(ans6[i].checked==true && (ans6[i].value=="True" || ans6[i].value=="true"))
		{
			score++;
			document.getElementById("answer6").innerHTML= "Congratulations!! You are correct";
			document.getElementById("answer6").className= "font-semibold text-lg quiz-correct";
		}

		if(ans6[i].checked==true && (ans6[i].value=="False" || ans6[i].value=="false"))
		{
			document.getElementById("answer6").innerHTML= "Beep Beep!! Wrong Answer!<br>Don't worry, Try again!";
			document.getElementById("answer6").className= "font-semibold text-lg quiz-wrong";
		}
		ans6[i].disabled = true;
	}
	alert("Your total score is " + score + " / 6");
}

function takequizagain()
{
	var ans1, ans2, ans3, ans4, ans5, ans6;
	ans1 = document.getElementsByName("Que1");
	ans2 = document.getElementsByName("Que2");  //dom
	ans3 = document.getElementsByName("Que3");
	ans4 = document.getElementsByName("Que4");
	ans5 = document.getElementsByName("Que5");
	ans6 = document.getElementsByName("Que6");
	
	for(var i = 0; i < 4; i++)
	{
		ans1[i].disabled = false;
		ans1[i].checked = false;
		ans2[i].disabled = false;
		ans2[i].checked = false;
		ans3[i].disabled = false;
		ans3[i].checked = false;
		ans4[i].disabled = false;
		ans4[i].checked = false;
		ans5[i].disabled = false;
		ans5[i].checked = false;
		ans6[i].disabled = false;
		ans6[i].checked = false;
	}
	document.getElementById("answer1").innerHTML= "";
	document.getElementById("answer1").className= "font-semibold text-lg";
	document.getElementById("answer2").innerHTML= "";
	document.getElementById("answer2").className= "font-semibold text-lg";
	document.getElementById("answer3").innerHTML= ""; //dom
	document.getElementById("answer3").className= "font-semibold text-lg";
	document.getElementById("answer4").innerHTML= "";
	document.getElementById("answer4").className= "font-semibold text-lg";
	document.getElementById("answer5").innerHTML= "";
	document.getElementById("answer5").className= "font-semibold text-lg";
	document.getElementById("answer6").innerHTML= "";
	document.getElementById("answer6").className= "font-semibold text-lg";
}