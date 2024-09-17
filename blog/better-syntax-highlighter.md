# Better syntax highlighter

Just a small update: this Webbed Site (tm) should now have a better syntax highlighter.

It won't have mistakes like <code>mgTrans<b>for</b>m</code> things that shouldn't be and also now colours functions, variables and enum-like names better. Oh, and it can do some basic comments!

Example:

<pre highlight="1">
local user = database.queryUserFromHandle("knot126");

// Print if user is admin or not
if (user.hasRole("admin")) {
    print("User is admin!");
}
else {
    print("User is NOT admin!");
}

// If rank isn't zero, also print that
if (user.rank != 0) {
    print("Rank: " + user.rank);
}
</pre>