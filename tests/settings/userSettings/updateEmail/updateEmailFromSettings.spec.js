import { test } from '../../../_fixtures/fixtures';
import { signUpUser } from '../../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update email from settings', async ({ settingsPage }) => {
  const newEmail = `${faker.person.firstName()}_${faker.internet.email()}`
    .toLowerCase()
    .replaceAll("'")
    .toLowerCase();

  await settingsPage.fillInputByPlaceholder('Email', newEmail);
  await settingsPage.clickUpdateSettingsButton();
  await settingsPage.open();
  await settingsPage.assertInputFieldHasValue('Email', newEmail);
});
