import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update password from settings', async ({
  settingsPage,
  user,
  signInPage,
  homePage,
}) => {
  const newPassword = faker.internet.password();

  await settingsPage.fillInputByPlaceholder('Password', newPassword);
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.open();
  await settingsPage.clickLogoutButton();
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();
  await homePage.assertYourFeedTabIsVisible();
});
