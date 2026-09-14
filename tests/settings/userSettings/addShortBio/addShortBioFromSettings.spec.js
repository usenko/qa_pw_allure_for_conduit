import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Add profile picture URL from settings', async ({
  settingsPage,
  page,
}) => {
  const newBio = faker.person.bio();

  await settingsPage.fillInputByPlaceholder('Short bio about you', newBio);
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.assertTextBioIsVisible(newBio);
});
