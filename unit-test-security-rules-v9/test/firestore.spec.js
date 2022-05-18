const { readFileSync } = require('fs');

const testing = require('@firebase/rules-unit-testing');
const { initializeTestEnvironment } = testing;

const { doc } = require('firebase/firestore');

/** @type testing.RulesTestEnvironment */
let testEnv;

describe("https://github.com/firebase/firebase-js-sdk/issues/6270", () => {
  it('test', async function() {
    testEnv = await initializeTestEnvironment({
      projectId: 'dconeybe-testing', // this is verified to be correct
      // verified - emulator runs in browser at localhost:8080 -> Ok
      firestore: {
        host: "localhost",
        port: 8080,
        rules: readFileSync("firestore.rules", "utf8"), // I can confirm these load correctly
      },
    });
    await testEnv.clearFirestore();
    context = testEnv.unauthenticatedContext();
    const firestore = context.firestore(); // <- ERROR: Service firestore is not available
    docRef = doc(firestore, 'blah/test@test.com');
  });
});
