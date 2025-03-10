import { createExpressApp } from './app';
import { PORT } from './config/env';

(async () => {
  const app = await createExpressApp();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
