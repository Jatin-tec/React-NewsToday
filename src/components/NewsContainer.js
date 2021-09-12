import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class NewsContainer extends Component {
  static defaultProps = {
    category: "general",
  };

  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?" +
      `q=${this.props.category}&` +
      "from=2021-09-04&" +
      "sortBy=popularity&" +
      "apiKey=f08aee49b1674761a4bc07bb93ca6cbc" +
      `&page=${this.state.page}` +
      "&pageSize=6";

    this.setState({ loading: true });

    let data = await fetch(url);
    let parasedData = await data.json();
    console.log(parasedData);

    this.setState({
      articles: parasedData.articles,
      totalArticles: parasedData.totalResults,
      loading: false,
    });
  }

  handelNext = async () => {
    let url =
      "https://newsapi.org/v2/everything?" +
      `q=${this.props.category}&` +
      "from=2021-09-04&" +
      "sortBy=popularity&" +
      "apiKey=f08aee49b1674761a4bc07bb93ca6cbc" +
      `&page=${this.state.page + 1}` +
      "&pageSize=6";

    this.setState({ loading: true });

    let data = await fetch(url);
    let parasedData = await data.json();
    console.log(parasedData);

    this.setState({
      articles: parasedData.articles,
      page: this.state.page + 1,
      totalArticles: parasedData.totalResults,
      loading: false,
    });
  };

  handelPrevious = async () => {
    let url =
      "https://newsapi.org/v2/everything?" +
      `q=${this.props.category}&` +
      "from=2021-09-04&" +
      "sortBy=popularity&" +
      "apiKey=f08aee49b1674761a4bc07bb93ca6cbc" +
      `&page=${this.state.page - 1}` +
      "&pageSize=6";

    this.setState({ loading: true });

    let data = await fetch(url);
    let parasedData = await data.json();
    console.log(parasedData);

    this.setState({
      articles: parasedData.articles,
      page: this.state.page - 1,
      totalArticles: parasedData.totalResults,
      loading: false,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
            <br />
            <b>Loading...</b>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="text-center my-2">
            <h1>News-Today : TOP HEADLINES</h1>
          </div>
          <div className="container my-4">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-lg-4 my-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : " "}
                      description={
                        element.description ? element.description : " "
                      }
                      imgUrl={element.urlToImage}
                      url={element.url}
                    />
                  </div>
                );
              })}
            </div>
            <div className="d-flex justify-content-between my-4">
              <button
                type="button"
                disabled={this.state.page <= 1}
                onClick={this.handelPrevious}
                className="btn btn-dark"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                disabled={this.state.page > this.state.totalArticles / 6}
                onClick={this.handelNext}
                className="btn btn-dark"
              >
                Next &rarr;
                {console.log(this.state.totalArticles / 6)}
              </button>
            </div>
          </div>
        </>
      );
    }
  }
}
