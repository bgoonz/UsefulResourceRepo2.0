		<!--<span class="masthead">Search</span> -->
		<form name="SearchForm" action="search.asp" method=POST>
            <select name="SearchType">
			  <option value="Music">Music</option>
			  <option value="Music_Artist">&nbsp;&gt;Artist</option>
			  <option value="Music_Album">&nbsp;&gt;Album</option>
			  <option value="Music_Song">&nbsp;&gt;Song</option>
			  <option value="Shows">Shows</option>
			  <option value="Shows_Artist">&nbsp;&gt;Artist</option>
			  <option value="News">News</option>  
            </select>
            <input type="text" name="SearchField" size="16">
            <input type="submit" name="Submit" value="Go">
		</form>