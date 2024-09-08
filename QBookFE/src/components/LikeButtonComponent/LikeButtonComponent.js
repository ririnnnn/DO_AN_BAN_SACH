const LikeButtonComponent = (props) => {
  const { dataHref, ...rests } = props;
  return (
    <div
      className="fb-like"
      data-href={dataHref}
      data-width=""
      data-layout=""
      data-action=""
      data-size=""
      data-share="true"
      {...rests}
    ></div>
  );
};

export default LikeButtonComponent;
