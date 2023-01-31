import { aui } from './helper/jest.setup';

describe('jest with askui', () => {

  it('should move the mouse to elements selected by relational selectors', async () => {

    await aui
      .moveMouseTo()
      .textfield()
      .below()
      .text()
      .withText('Mobile Number')
      .exec();
    
    await aui
      .moveMouseTo()
      .textfield()
      .above()
      .button()
      .withText('Submit')
      .exec();

    await aui
      .moveMouseTo()
      .textfield()
      .contains()
      .text()
      .withText('First Crush')
      .exec();

    await aui
      .moveMouseTo()
      .text()
      .in()
      .textfield()
      .exec();

    await aui
      .moveMouseTo()
      .text()
      .leftOf()
      .text()
      .withText('Denmark')
      .exec();

    await aui
      .moveMouseTo()
      .text()
      .rightOf()
      .text()
      .withExactText('Joe Root')
      .exec();

    await aui
      .moveMouseTo()
      .textfield()
      .nearestTo()
      .text()
      .withTextRegex('User Em*')
      .exec();

  });

});
