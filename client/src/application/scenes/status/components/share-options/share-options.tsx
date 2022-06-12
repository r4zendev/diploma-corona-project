export function ShareOptions() {
  return (
    <div className="status__content__title-area__share-options">
      <div
        className="fb-share-button"
        data-href="https://coronanews.com.ua"
        data-layout="button"
        data-size="small"
      >
        <a
          className="fb-xfbml-parse-ignore"
          onClick={() => {
            window.open(
              'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcoronanews.com.ua%2F&amp;src=sdkpreparse',
              'Share via Facebook',
              'width=600,height=400'
            );
          }}
        >
          Share
        </a>
      </div>
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=I would like to share the news I've just got familiar with on coronanews.com. Visit https://coronanews.com.ua to be on the same page with current COVID-19 situation in the world!"
      >
        Tweet
      </a>
    </div>
  );
}
