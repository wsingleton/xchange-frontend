import { ERSPage } from './app.po';

describe('ers App', function() {
  let page: ERSPage;

  beforeEach(() => {
    page = new ERSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
