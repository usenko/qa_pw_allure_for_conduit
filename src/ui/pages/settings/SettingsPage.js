import { expect, testStep } from '../../../common/helpers/pw';

export class SettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
    this.logoutButton = page.getByRole('button', {
      name: 'Or click here to logout.',
    });
  }

  async open() {
    await this.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillInputByPlaceholder(placeHolderName, inputValue) {
    await this.step(`Fill the '${placeHolderName} field`, async () => {
      await this.page.getByPlaceholder(placeHolderName).clear();
      await this.page.getByPlaceholder(placeHolderName).fill(inputValue);
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      await Promise.all([
        this.page.waitForResponse(response => {
          console.log('👉 МЕТОД:', response.request().method());
          console.log('👉 URL:', response.url());
          return (
            response.url().includes('user') &&
            response.request().method() === 'PUT' &&
            response.status() === 200
          );
        }),
        this.updateSettingsButton.click(),
      ]);
      await this.page.waitForURL(/.*\/profile\/.*/);
    });
  }

  async assertUserNameIsVisible(username) {
    await this.step(`Assert username is visible on page`, async () => {
      await expect(
        this.page.getByRole('link', { name: username }),
      ).toBeVisible();
    });
  }

  async assertInputFieldHasValue(placeHolderName, inputValue) {
    await this.step(
      `Assert ${placeHolderName} field has a correct input value`,
      async () => {
        await expect(this.page.getByPlaceholder(placeHolderName)).toHaveValue(
          inputValue,
        );
      },
    );
  }

  async assertProfilePictureUrl(username, url) {
    await this.step(`Assert profile avatar image source URL`, async () => {
      const profileImageLocator = this.page
        .getByRole('link', { name: username })
        .locator('img.user-pic');
      await expect(profileImageLocator).toHaveAttribute('src', url);
    });
  }

  async logout() {
    await this.step(`Click 'Or click here to logout.' button`, async () => {
      await this.logoutButton.click();
    });
  }

  async assertTextBioIsVisible(text) {
    await this.step(`Assert username is visible on page`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
