// The functions you see below are the functions that I use in the game "Blackjack!" for shuffling and dealing cards. 
// As you can see, in function "Deal ()" there is an array named "deck", which is also present in this same repository.
// I'm just shuffling the full array of cards at the start of the game. Then I'm dealing it until it is empty. Then I shuffle the deck and repeat the whole process.

function Shuffle () {

	for (var i : int = 0; i < 52 * deckCount; i++)
	{
		var m = Random.Range(0, 52 * deckCount);
		var temp : GameObject;
		temp = deck [i];
		deck [i] = deck [m];
		deck [m] = temp;
	}

}


function Deal (dealWho : String) {
	
	if (dealWho == "dealer")
	{
		timer = 0;
		soundDeal.Play ();
	
		dealerHand[m] = deck[k];
		dealerHandTotal +=  GetValue (dealerHand[m].tag);
		
		var clone = Instantiate (dealerHand[m], Vector3 (0 + m * 0.2343085, 3.043251, -m * 0.01), Quaternion.Euler (0,0,0));
		clone.renderer.sortingOrder = zOrder + chipOrder;
		zOrder++;
		
		if (m == 1)
		{
			originalSprite = clone.GetComponent(SpriteRenderer).sprite;
			clone.GetComponent(SpriteRenderer).sprite = closedCard;
			clone.GetComponent(Card).closed = true;
			
			closedCount = GetCount (clone.tag);
			
			if (clone.tag == "ace")
				closedHasAce = true;
							
			if (realDealerTotal == 21)
				dealerBlackjack = true;
		}
		
		else
		{
			runningCount += GetCount (deck [k].tag);
			dealerFontSize = screenHeight/20;
		}
		
		dealerAces = 0;
		
		for (var r : int = 0; r < 15; r++)
		{
			if (dealerHand[r] != null)
				if (dealerHand[r].tag == "ace")
					dealerAces ++;
		}
		
		var realDealerSet : int = 0;
		
		for (var a : int = 0; a <= dealerAces; a++)
		{
			if (dealerHandTotal - a * 10 <= 21 && dealerHandTotal - a * 10 > 11)
			{
				realDealerTotal = dealerHandTotal - a * 10;
			
				realDealerSet++;
			
				if (dealerAces > 0)
					dealerSoft = true;
				
				if (a == dealerAces && dealerAces != 0)
					dealerSoft = false;
			}
		}

		if (realDealerSet == 0)
			realDealerTotal = dealerHandTotal - dealerAces * 10;
			
		if (m == 1 && dealerHandTotal == 11)
			realDealerTotal = 11;
			
		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		clone.GetComponent(Card).owner = "Dealer";
		clone.GetComponent(Card).cardOrder = m;

		k++;
		m++;
		
		var cards : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards) {
			if (card.owner == "Dealer")
		    {
				card.offset = -m * 0.08;
                card.currentCardOrder = m - 1;
			}
		}
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		if (realDealerTotal == 21 && m == 2)
			dealerBlackjack = true;
			
		if (!split)
		{
			if ((playerStand || playerBusted || playerBlackjack || (dealerBlackjack && insuranceOfferAnswered)) && !closed)
			{
				dealerHandViewableTotal = realDealerTotal;
			}
			
			else
			{
				if (dealerHand[0] != null)
					dealerHandViewableTotal = GetValue(dealerHand[0].tag);
			}
		}
		
		if (split && dealCooldown <= 0)
		{
			if ((splitStand || splitBusted || (splitBlackjack && (playerBlackjack || playerBusted || playerStand )) || dealerBlackjack)  && !closed)
			{
				dealerHandViewableTotal = realDealerTotal;
			}
			
			else
			{
				if (dealerHand[0] != null)
					dealerHandViewableTotal = GetValue(dealerHand[0].tag);
			}
		}
	}
	
	else if (dealWho == "player")
	{
		timer = 0;
		playerFontSize = screenHeight/20;
		
		swipeStart = Vector2 (-1000, -1000);
		swipeEnd = Vector2 (-1000, -1000);
		
		soundDeal.Play ();
	
		playerHand[j] = deck[k];
		playerHandTotal +=  GetValue (playerHand[j].tag);
			
		if (split)
		{
			var cardSplit = Instantiate (playerHand[j], Vector3 (-1.35 + j * 0.2343085, -2.52, -j * 0.01), Quaternion.Euler (0,0,0)); // + j * 0.1843085
			cardSplit.renderer.sortingOrder = zOrder + chipOrder;
			cardSplit.GetComponent(Card).cardOrder = j;
			zOrder++;
		}
		
		else if (doubledDown)
		{
			var pieceRotation = Quaternion.AngleAxis(270, Vector3.forward);
			var cardDoubledown = Instantiate (playerHand[j], Vector2 (0.1 + j * 0.3843085, -2.62), pieceRotation); //  + j * 0.1843085
			cardDoubledown.renderer.sortingOrder = zOrder + chipOrder;
			cardDoubledown.GetComponent(Card).perpendicular = true;
			cardDoubledown.GetComponent(Card).cardOrder = j;
			zOrder++;
		}
		
		else
		{
			if (j == 0)
			{
				playerCard1 = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.62, -j * 0.01), Quaternion.Euler(0,0,0)); //  + j * 0.1843085 // -2.984436
				playerCard1.renderer.sortingOrder = zOrder + chipOrder;
				playerCard1.GetComponent(Card).cardOrder = j;
				zOrder++;
			}
				
			else if (j == 1)
			{
				playerCard2 = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.62, -j * 0.01), Quaternion.Euler(0,0,0)); //  + j * 0.1843085 // -2.984436
				playerCard2.renderer.sortingOrder = zOrder + chipOrder;
				playerCard2.GetComponent(Card).cardOrder = j;
				zOrder++;
			}
				
			else
			{
				var cardNormal = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.62, -j * 0.01), Quaternion.Euler(0,0,0)); //  + j * 0.1843085 // -2.984436
				cardNormal.renderer.sortingOrder = zOrder + chipOrder;
				cardNormal.GetComponent(Card).cardOrder = j;
				zOrder++;
			}
		}
		
		runningCount += GetCount (deck [k].tag);
				
		k++;
		j++;
		
		var cards2 : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards2) {
			if (card.owner == "Player")
			{
				card.offset = -j * 0.09;
                		card.currentCardOrder = j - 1;
			}
		}

		if (j == 2 && GetValue (playerHand[0].tag) == GetValue (playerHand[1].tag) )
			splitable = true;
	
		playerAces = 0;
								
		for (var u : int = 0; u < 15; u++)
		{
			if (playerHand[u] != null)			
				if (playerHand[u].tag == "ace")
					playerAces ++;
		}
		
		var realPlayerSet : int = 0;
		
		for (var e : int = 0; e <= playerAces; e++)
		{
			if (playerHandTotal - e * 10 <= 21 && playerHandTotal - e * 10 > 11)
			{
				realPlayerTotal = playerHandTotal - e * 10;
				
				if (playerAces > 0)
					playerSoft = true;
				
				if (e == playerAces && playerAces != 0)
					playerSoft = false;
				
				realPlayerSet++;
			}
		}
		
		if (realPlayerSet == 0)
			realPlayerTotal = playerHandTotal - playerAces * 10;
			
		if (j == 1 && playerHandTotal == 11)
			realPlayerTotal = 11;
			
		if (showSwipeGesture && j == 2 && (realPlayerTotal < 17 || realPlayerTotal == 21) )
		{
			showSwipeGesture = false;
			PlayerPrefs.SetInt("SwipeGestureShown", 0);
		}
		
		if (showDoubleTap && j == 2 && realPlayerTotal > 11)
		{
			showDoubleTap = false;
			PlayerPrefs.SetInt("DoubleTapShown", 0);
		}
				
		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
			
		if (realPlayerTotal == 21 && insuranceOfferAnswered)
		{
			playerStand = true;
			
			if (j == 2 && split)
			{
			//	playerBlackjack = true;
				doneWithPlayer = true;
				calculatedPlayerHand = true;
			}
		}
		
		dealCooldown = 0.9;
	}
	
	else if (dealWho == "split")
	{
		soundDeal.Play ();
		splitFontSize = screenHeight/20;
	
		runningCount += GetCount (deck [k].tag);
	
		if (k == Mathf.RoundToInt(52 * deckCount * 1.0 * penetrationPercentage/100))
		{
			runningCount = 0;
			shufflingSecs = 2;
			dealCooldown = 1.5;
			showCooldown = 1.5;
			soundShortShuffle.Play();
			Instantiate (refresh);
			
			for (var i : int = 0; i < 52 * deckCount; i++)
			{
				var m = Random.Range(0, 52 * deckCount);
				var temp : GameObject;
				temp = deck [i];
				deck [i] = deck [m];
				deck [m] = temp;
			}
			
			k = 0;
		}
	
		splitHand[y] = deck[k];
		splitHandTotal +=  GetValue (splitHand[y].tag);
			
		var splitCard = Instantiate (splitHand[y], Vector3 (1.65 + y * 0.2343085, -2.52, -y * 0.01), Quaternion.Euler(0,0,0)); //  + y * 0.1843085
        	splitCard.GetComponent(Card).cardOrder = y;
		splitCard.renderer.sortingOrder = zOrder + chipOrder;
		zOrder++;
		
		splitCard.GetComponent(Card).owner = "Split";
		
		splitAces = 0;
		
		for (var b : int = 0; b < 15; b++)
		{
			if (splitHand[b] != null)		
				if (splitHand[b].tag == "ace")
					splitAces ++;
		}
		
		var realSplitSet : int = 0;
		
		for (var lel : int = 0; lel <= splitAces; lel++)
		{
			if (splitHandTotal - lel * 10 <= 21 && splitHandTotal - lel * 10 > 11)
			{
				realSplitTotal = splitHandTotal - lel * 10;
				
				realSplitSet++;
			
				if (splitAces > 0)
					splitSoft = true;
				
				if (lel == splitAces && splitAces != 0)
					splitSoft = false;
			}
		}
		
		if (realSplitSet == 0)
			realSplitTotal = splitHandTotal - splitAces * 10;
			
		if (y == 1 && splitHandTotal == 11)
			realSplitTotal = 11;

		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		k++;
		y++;
		
		var cards3 : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards3) {
			if (card.owner == "Split")
		    {
                card.currentCardOrder = y - 1;
				card.offset = -y * 0.08;
		    }
		}
		
		dealCooldown = 0.8;
		
	}
	
	var cardsLeft : int = deckCount * 52 * penetrationPercentage/100 - k;
	
	if ( cardsLeft % 52 == 0)
	{
		cardLeftTimer = 3;
		deckLeftTimer = 3;
	}
}
