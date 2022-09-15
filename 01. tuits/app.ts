type Message = string;
type Title = string;
type Id = string;

interface Tweet {
  id: string;
  message: Message;
}
interface TweetView {
  id: string;
  tweets: Tweet[];
}

function createMainTweet(): TweetView {
  const id = crypto.randomUUID() as Id;
  const tweet = createTweet();

  console.log({ id });

  return {
    id,
    tweets: [tweet],
  };
}

function createTweet(): Tweet {
  const tweetId = crypto.randomUUID();
  const message = "";
  return {
    id: tweetId,
    message,
  };
}

function renderView(tweetView: TweetView) {
  let view: HTMLDivElement | null = document.querySelector(
    "#container-" + tweetView.id
  );

  if (view) {
    view.innerHTML = "";
  } else {
    view = document.createElement("div");
    view.id = "container-" + tweetView.id;
    view.classList.add("mainContainer");
    document.querySelector("#tweets")?.append(view);
  }
  for (const tweet of tweetView.tweets) {
    renderTweet(tweetView, view, tweet);
  }
}

function renderTweet(tweetView: TweetView, view: HTMLDivElement, tweet: Tweet) {
  const tweetContainer = document.createElement("div");
  tweetContainer.id = "container-" + tweet.id;
  tweetContainer.classList.add("tweetContainer");

  const form = document.createElement("form");
  form.id = "form-" + tweet.id;
  tweetContainer.appendChild(form);

  const textarea: HTMLTextAreaElement = document.createElement("textarea");
  textarea.id = "textarea" + tweet.id;
  textarea.value = tweet.message;
  textarea.maxLength = 250;

  const buttonAddMore = document.createElement("button");
  buttonAddMore.classList.add("button", "buttonNew");
  buttonAddMore.value = "Add another tweet";
  buttonAddMore.append(document.createTextNode("Add another tweet"));

  buttonAddMore.addEventListener("click", (e) => {
    e.preventDefault();
    const anotherTweet = createTweet();
    tweetView.tweets.push(anotherTweet);
    console.log(tweetView.tweets);
    renderView(tweetView);
  });

  textarea.addEventListener("input", (e: Event) => {
    const value = (e.target as HTMLTextAreaElement).value;
    updateTweet(tweetView, tweet, value);
  });

  form.append(textarea, buttonAddMore);

  view.append(tweetContainer);
}

function updateTweet(tweetView: TweetView, tweet: Tweet, value: Message) {
  console.log(tweet);
  let ref: Tweet | null = null;
  for (let i = 0; i < tweetView.tweets.length; i++) {
    const t = tweetView.tweets[i];
    if (t.id === tweet.id) {
      ref = t;
      break;
    }
  }
  if (ref) {
    ref.message = value;
  }
}

const bNewTweet: HTMLButtonElement | null =
  document.querySelector("#bNewTweet");

const tweetsContainer = document.querySelector("#tweets");
const tweetsData: TweetView[] = [];

bNewTweet?.addEventListener("click", (e) => {
  e.preventDefault();
  const newTweet = createMainTweet();
  renderView(newTweet);
});
