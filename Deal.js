// The functions you see below are the functions that I use in the game "Blackjack!" for shuffling and dealing cards. 
// As you can see, in function "Deal ()" there is an array named "deck", which is also present in this same repository.
// I'm just shuffling the full array of cards at the start of the game. Then I'm dealing it until it is empty. Then I shuffle the deck and repeat the whole process.

function Shuffle () {

	for (var i : int = 0; i < 52; i++)
	{
		var m = Random.Range(0, 52);
		var temp : GameObject;
		temp = deck [i];
		deck [i] = deck [m];
		deck [m] = temp;
	}

}


function Deal (dealWho : String) {
	
	if (dealWho == "dealer")
	{
		soundDeal.Play ();
	
		dealerHand[m] = deck[k];
		dealerHandTotal +=  GetValue (dealerHand[m].tag);
		
		if (dealerHandTotal2 != 0)
			dealerHandTotal2 +=  GetValue (dealerHand[m].tag);
		
		var clone = Instantiate (dealerHand[m], Vector3 (0 + m * 0.2343085, 3.043251, -m * 0.01), Quaternion.Euler (0,0,0));
		clone.renderer.sortingOrder = zOrder + chipOrder;
		zOrder++;
		
		if (m == 1)
		{
			originalSprite = clone.GetComponent(SpriteRenderer).sprite;
			clone.GetComponent(SpriteRenderer).sprite = closedCard;
			clone.GetComponent(Card).closed = true;
			
			if (clone.tag == "ace")
				closedHasAce = true;
							
			if (realDealerTotal == 21)
				dealerBlackjack = true;
		}
		
		dealerAces = 0;
		
		for (var r : int = 0; r < 15; r++)
		{
			if (dealerHand[r] != null)
				if (dealerHand[r].tag == "ace")
					dealerAces ++;
		}

		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		if (dealerAces == 1)
		{
			dealerHandTotal2 = dealerHandTotal - 10;
		}
		
		if (dealerAces == 2 && !dealerAces2Counted)
		{
			dealerHandTotal -= 10;
			dealerHandTotal2 = dealerHandTotal - 10;
			dealerAces2Counted = true;
		}
			
		if (dealerAces == 3 && !dealerAces3Counted)
		{
			dealerHandTotal -= 10;
			dealerHandTotal2 = dealerHandTotal - 10;
			dealerAces3Counted = true;
		}
			
		if (dealerAces == 4 && !dealerAces4Counted)
		{
			dealerHandTotal -= 10;
			dealerHandTotal2 = dealerHandTotal - 10;
			dealerAces3Counted = true;
		}
		
		if (dealerHandTotal > 21 && dealerHandTotal2 != 0)
			realDealerTotal = dealerHandTotal2;
		
		else
			realDealerTotal = dealerHandTotal;
		
		clone.GetComponent(Card).owner = "Dealer";

		k++;
		m++;
		
		var cards : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards) {
			if (card.owner == "Dealer")
			{
				card.offset = -m * 0.08;
			}
		}
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		if (realDealerTotal == 21 && m == 2)
			dealerBlackjack = true;
	}
	
	else if (dealWho == "player")
	{
	
		swipeStart = Vector2 (-1000, -1000);
		swipeEnd = Vector2 (-1000, -1000);
		
		soundDeal.Play ();
	
		playerHand[j] = deck[k];
		playerHandTotal +=  GetValue (playerHand[j].tag);
		
		if (playerHandTotal2 != 0)
			playerHandTotal2 +=  GetValue (playerHand[j].tag);
			
		if (split)
		{
			var cardSplit = Instantiate (playerHand[j], Vector3 (-1.35 + j * 0.2343085, -2.724436 + j * 0.1843085, -j * 0.01), Quaternion.Euler (0,0,0));
			cardSplit.renderer.sortingOrder = zOrder + chipOrder;
			zOrder++;
			
		}
		
		else if (doubledDown)
		{		
		
			var pieceRotation = Quaternion.AngleAxis(270, Vector3.forward);
			var cardDoubledown = Instantiate (playerHand[j], Vector2 (0.1 + j * 0.3843085, -2.724436 + j * 0.1843085), pieceRotation);
			cardDoubledown.renderer.sortingOrder = zOrder + chipOrder;
			cardDoubledown.GetComponent(Card).perpendicular = true;
			zOrder++;
		}
		
		else
		{
			if (j == 0)
			{
				playerCard1 = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.984436 + j * 0.1843085, -j * 0.01), Quaternion.Euler(0,0,0));
				playerCard1.renderer.sortingOrder = zOrder + chipOrder;
				zOrder++;
			}
				
			else if (j == 1)
			{
				playerCard2 = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.984436 + j * 0.1843085, -j * 0.01), Quaternion.Euler(0,0,0));
				playerCard2.renderer.sortingOrder = zOrder + chipOrder;
				zOrder++;
			}
				
			else
			{
				var cardNormal = Instantiate (playerHand[j], Vector3 (0.1 + j * 0.2343085, -2.984436 + j * 0.1843085, -j * 0.01), Quaternion.Euler(0,0,0));
				cardNormal.renderer.sortingOrder = zOrder + chipOrder;
				zOrder++;
			}
		}
				
		k++;
		j++;
		
		var cards2 : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards2) {
			if (card.owner == "Player")
			{
				card.offset = -j * 0.09;
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

		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		if (playerAces == 1)
		{
			playerHandTotal2 = playerHandTotal - 10;
		}
		
		if (playerAces == 2 && !playerAces2Counted)
		{
			playerHandTotal -= 10;
			playerHandTotal2 = playerHandTotal - 10;
			playerAces2Counted = true;
		}
			
		if (playerAces == 3 && !playerAces3Counted)
		{
			playerHandTotal -= 10;
			playerHandTotal2 = playerHandTotal - 10;
			playerAces3Counted = true;
		}
			
		if (playerAces == 4 && !playerAces4Counted)
		{
			playerHandTotal -= 10;
			playerHandTotal2 = playerHandTotal - 10;
			playerAces4Counted = true;
		}
		
		if (playerHandTotal > 21 && playerHandTotal2 != 0)
			realPlayerTotal = playerHandTotal2;
		
		else
			realPlayerTotal = playerHandTotal;
			
		if (realPlayerTotal == 21 && insuranceOfferAnswered)
		{
			playerStand = true;
			
			if (j == 2 && split)
			{
				playerBlackjack = true;
				doneWithPlayer = true;
				calculatedPlayerHand = true;
			}
		}
		
		dealCooldown = 0.9;
	}
	
	else if (dealWho == "split")
	{
		soundDeal.Play ();
	
		splitHand[y] = deck[k];
		splitHandTotal +=  GetValue (splitHand[y].tag);
		if (splitHandTotal2 != 0)
			splitHandTotal2 +=  GetValue (splitHand[y].tag);
			
		var splitCard = Instantiate (splitHand[y], Vector3 (1.65 + y * 0.2343085, -2.724436 + y * 0.1843085, -y * 0.01), Quaternion.Euler(0,0,0));
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

		//////////////////////////////////////////////////////
		
		if (dealerHand[0] != null)
			if (dealerHand[0].tag != "ace")
				insuranceOfferAnswered = true;
		
		if (splitAces == 1)
		{
			splitHandTotal2 = splitHandTotal - 10;
		}
		
		if (splitAces == 2 && !splitAces2Counted)
		{
			splitHandTotal -= 10;
			splitHandTotal2 = splitHandTotal - 10;
			splitAces2Counted = true;
		}
			
		if (splitAces == 3 && !splitAces3Counted)
		{
			splitHandTotal -= 10;
			splitHandTotal2 = splitHandTotal - 10;
			splitAces3Counted = true;
		}
			
		if (splitAces == 4 && !splitAces4Counted)
		{
			splitHandTotal -= 10;
			splitHandTotal2 = splitHandTotal - 10;
			splitAces4Counted = true;
		}
		
		if (splitHandTotal > 21 && splitHandTotal2 != 0)
			realSplitTotal = splitHandTotal2;
		
		else
			realSplitTotal = splitHandTotal;
		
		k++;
		y++;
		
		var cards3 : Card[] = FindObjectsOfType(Card) as Card[];
	
		for (var card : Card in cards3) {
			if (card.owner == "Split")
			{
				card.offset = -y * 0.08;
			}
		}
		
		dealCooldown = 0.8;
		
	}
}