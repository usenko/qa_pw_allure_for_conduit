import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update username from settings', async ({ settingsPage }) => {
  const newUserName = `${faker.person.firstName()}_${faker.person.lastName()}`
    .replaceAll("'")
    .toLowerCase();

  await settingsPage.fillInputByPlaceholder('Username', newUserName);
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.assertUserNameIsVisible(newUserName);
});
