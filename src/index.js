unrollr = {};

unrollr.unroll = function(elements) {
  console.log(elements);
  for (const element of elements) {
    const blockquotes = unrollr.dive(element);
    console.log(element, blockquotes);
    while (blockquotes.length > 1) {
      const blockquote = blockquotes.shift();
      const lastQuote = blockquotes[blockquotes.length-1].link;
      const parent = lastQuote.parentElement;
      parent.insertBefore(blockquote.link, lastQuote);
      parent.insertBefore(blockquote.blockquote, lastQuote);
    };
  };
};

unrollr.dive = function(element, blockquotes = []) {
  const blockquote = element.querySelector('p + blockquote');
  if (blockquote != null) {
    const link = element.querySelector('p a.tumblr_blog').parentElement;
    blockquotes = unrollr.dive(blockquote, blockquotes);
    blockquotes.push({blockquote: blockquote, link: link});
  }
  return blockquotes;
};

unrollr.byClass = function(className = 'post') {
  const elements = document.getElementsByClassName(className);
  unrollr.unroll(elements);
};
