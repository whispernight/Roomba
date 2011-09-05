/** File: chatUser.js
 * Candy - Chats are not dead yet.
 *
 * Authors:
 *   - Patrick Stadler <patrick.stadler@amiadogroup.com>
 *   - Michael Weibel <michael.weibel@amiadogroup.com>
 *
 * Copyright:
 *   (c) 2011 Amiado Group AG. All rights reserved.
 */

/** Class: Candy.Core.ChatUser
 * Chat User
 */
Candy.Core.ChatUser = function(jid, nick, affiliation, role) {
	/** Constant: ROLE_MODERATOR
	 * Moderator role
	 */
	this.ROLE_MODERATOR    = 'moderator';

	/** Constant: AFFILIATION_OWNER
	 * Affiliation owner
	 */
	this.AFFILIATION_OWNER = 'owner';

	/** Object: data
	 * User data containing:
	 * - jid
	 * - nick
	 * - affiliation
	 * - role
	 */
	this.data = {
		jid: jid,
		nick: nick,
		affiliation: affiliation,
		role: role,
		privacyLists: {},
		customData: {},
		oldNick: undefined
	};

	/** Function: getJid
	 * Gets user jid
	 *
	 * Returns:
	 *   (String) - jid
	 */
	this.getJid = function() {
		return this.data.jid;
	};
	
	/** Function: setJid
	 * Sets a user's jid
	 *
	 * Parameters:
	 *   (String) jid - New Jid
	 */
	this.setJid = function(jid) {
		this.data.jid = jid;
	};

	/** Function: getNick
	 * Gets user nick
	 *
	 * Returns:
	 *   (String) - nick
	 */
	this.getNick = function() {
		return this.data.nick;
	};
	
	/** Function: setNick
	 * Sets a user's nick
	 *
	 * Parameters:
	 *   (String) nick - New nick
	 */
	this.setNick = function(nick) {
		this.data.nick = nick;
	};

	/** Function: getRole
	 * Gets user role
	 *
	 * Returns:
	 *   (String) - role
	 */
	this.getRole = function() {
		return this.data.role;
	};

	/** Function: getAffiliation
	 * Gets user affiliation
	 *
	 * Returns:
	 *   (String) - affiliation
	 */
	this.getAffiliation = function() {
		return this.data.affiliation;
	};

	/** Function: isModerator
	 * Check if user is moderator. Depends on the room.
	 *
	 * Returns:
	 *   (Boolean) - true if user has role moderator or affiliation owner
	 */
	this.isModerator = function() {
		return this.getRole() === this.ROLE_MODERATOR || this.getAffiliation() === this.AFFILIATION_OWNER;
	};

	/** Function: addToOrRemoveFromPrivacyList
	 * Convenience function for adding/removing users from ignore list.
	 *
	 * Check if user is already in privacy list. If yes, remove it. If no, add it.
	 *
	 * Parameters:
	 *   (String) list - To which privacy list the user should be added / removed from. Candy supports curently only the "ignore" list.
	 *   (String) jid  - User jid to add/remove
	 *
	 * Returns:
	 *   (Array) - Current privacy list.
	 */
	this.addToOrRemoveFromPrivacyList = function(list, jid) {
		if (!this.data.privacyLists[list]) {
			this.data.privacyLists[list] = [];
		}
		var index = -1;
		if ((index = this.data.privacyLists[list].indexOf(jid)) !== -1) {
			this.data.privacyLists[list].splice(index, 1);
		} else {
			this.data.privacyLists[list].push(jid);
		}
		return this.data.privacyLists[list];
	};

	/** Function: getPrivacyList
	 * Returns the privacy list of the listname of the param.
	 *
	 * Parameters:
	 *   (String) list - To which privacy list the user should be added / removed from. Candy supports curently only the "ignore" list.
	 *
	 * Returns:
	 *   (Array) - Privacy List
	 */
	this.getPrivacyList = function(list) {
		if (!this.data.privacyLists[list]) {
			this.data.privacyLists[list] = [];
		}
		return this.data.privacyLists[list];
	};
	
	/** Function: setPrivacyLists
	 * Sets privacy lists.
	 *
	 * Parameters:
	 *   (Object) lists - List object
	 */
	this.setPrivacyLists = function(lists) {
		this.data.privacyLists = lists;
	}

	/** Function: isInPrivacyList
	 * Tests if this user ignores the user provided by jid.
	 *
	 * Parameters:
	 *   (String) list - Privacy list
	 *   (String) jid  - Jid to test for
	 *
	 * Returns:
	 *   (Boolean)
	 */
	this.isInPrivacyList = function(list, jid) {
		if (!this.data.privacyLists[list]) {
			return false;
		}
		return this.data.privacyLists[list].indexOf(jid) !== -1;
	};

	/** Function: setCustomData
	 * Stores custom data
	 *
	 *	Parameter:
	 *	  (Object) data - Object containing custom data
	 */
	this.setCustomData = function(data) {
		this.data.customData = data;
	};

	/** Function: getCustomData
	 * Retrieve custom data
	 *
	 *	Returns:
	 *	  (Object) - Object containing custom data
	 */
	this.getCustomData = function() {
		return this.data.customData;
	};
	
	/** Function: setOldNick
	 * If user has nickname changed, set old nick.
	 *
	 * Parameters:
	 *   (String) oldNick - the old nick
	 */
	this.setOldNick = function(oldNick) {
		this.data.oldNick = oldNick;
	};
	
	/** Function: hasNicknameChanged
	 * Gets the old nick if available.
	 *
	 * Returns:
	 *   (String) - old nickname
	 */
	this.getOldNick = function() {
		return this.data.oldNick;
	};
	
	/** Function: clone 
	 * Clones current user and returns a new user
	 *
	 * Returns:
	 *   (Candy.Core.ChatUser) - User
	 */
	this.clone = function() {
		var newUser = new Candy.Core.ChatUser(this.getJid(), this.getNick(), this.getAffiliation(), this.getRole());
		newUser.setPrivacyLists(this.data.privacyLists);
		newUser.setCustomData(this.getCustomData());
		
		return newUser;
	};
};