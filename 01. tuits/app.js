function createMainTweet() {
    var id = crypto.randomUUID();
    var tweet = createTweet();
    console.log({ id: id });
    return {
        id: id,
        tweets: [tweet]
    };
}
function createTweet() {
    var tweetId = crypto.randomUUID();
    var message = "";
    return {
        id: tweetId,
        message: message
    };
}
function renderView(tweetView) {
    var _a;
    var view = document.querySelector("#container-" + tweetView.id);
    if (view) {
        view.innerHTML = "";
    }
    else {
        view = document.createElement("div");
        view.id = "container-" + tweetView.id;
        view.classList.add("mainContainer");
        (_a = document.querySelector("#tweets")) === null || _a === void 0 ? void 0 : _a.append(view);
    }
    for (var _i = 0, _b = tweetView.tweets; _i < _b.length; _i++) {
        var tweet = _b[_i];
        renderTweet(tweetView, view, tweet);
    }
}
function renderTweet(tweetView, view, tweet) {
    var tweetContainer = document.createElement("div");
    tweetContainer.id = "container-" + tweet.id;
    tweetContainer.classList.add("tweetContainer");
    var form = document.createElement("form");
    form.id = "form-" + tweet.id;
    tweetContainer.appendChild(form);
    var textarea = document.createElement("textarea");
    textarea.id = "textarea" + tweet.id;
    textarea.value = tweet.message;
    textarea.maxLength = 250;
    var buttonAddMore = document.createElement("button");
    buttonAddMore.classList.add("button", "buttonNew");
    buttonAddMore.value = "Add another tweet";
    buttonAddMore.append(document.createTextNode("Add another tweet"));
    buttonAddMore.addEventListener("click", function (e) {
        e.preventDefault();
        var anotherTweet = createTweet();
        tweetView.tweets.push(anotherTweet);
        console.log(tweetView.tweets);
        renderView(tweetView);
    });
    textarea.addEventListener("input", function (e) {
        var value = e.target.value;
        updateTweet(tweetView, tweet, value);
    });
    form.append(textarea, buttonAddMore);
    view.append(tweetContainer);
}
function updateTweet(tweetView, tweet, value) {
    console.log(tweet);
    var ref = null;
    for (var i = 0; i < tweetView.tweets.length; i++) {
        var t = tweetView.tweets[i];
        if (t.id === tweet.id) {
            ref = t;
            break;
        }
    }
    if (ref) {
        ref.message = value;
    }
}
var bNewTweet = document.querySelector("#bNewTweet");
var tweetsContainer = document.querySelector("#tweets");
var tweetsData = [];
bNewTweet === null || bNewTweet === void 0 ? void 0 : bNewTweet.addEventListener("click", function (e) {
    e.preventDefault();
    var newTweet = createMainTweet();
    renderView(newTweet);
});
