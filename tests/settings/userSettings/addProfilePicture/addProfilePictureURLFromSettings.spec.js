import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Add profile picture URL from settings', async ({
  settingsPage,
  user,
}) => {
  const newProfilePictureUrl = faker.image.avatarGitHub();

  await settingsPage.fillInputByPlaceholder(
    'URL of profile picture',
    newProfilePictureUrl,
  );
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.assertProfilePictureUrl(
    user.username,
    newProfilePictureUrl,
  );
});
