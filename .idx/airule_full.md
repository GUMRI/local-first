
# 📘 AI CIDE Code Rules  
**Angular v19 + Ionic 8 + Transloco + RxDB (Local-First)**  

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── pages/               # standalone pages
│   ├── common/              # reusable components, pipes
│   ├── core/
│   │   ├── services/        # business logic services
│   │   │   └── user.service.ts
│   │   ├── local-first/
│   │   │   ├── types/
│   │   │   ├── schema/
│   │   │   ├── units/
│   │   │   ├── database.service.ts
│   │   │   └── collection.service.ts
├── assets/
│   ├── i18n/                # Transloco translation JSON files
│   │   ├── en.json
│   │   ├── ar.json
│   │   └── fr.json
├── icons/
├── imgs/
```

---

## 📌 Coding Rules

### ✅ 1. Components
- All components must be **standalone**
- Filenames use **kebab-case**
- Selectors follow: `app-entity-name`
- Import `TranslocoModule` and `IonicModule` locally.

Example:
```ts
@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [IonicModule, TranslocoModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent {}
```

---

### ✅ 2. Services  
- Services go inside `core/services`
- Use `inject()` API for DI in Angular v19.
- Use **signals** for local state, **RxJS Observables** for async operations with RxDB.

Example:
```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private users = signal<User[]>([]);
  get all() { return this.users; }

  add(user: User) {
    this.users.update(u => [...u, user]);
  }
}
```

---

### ✅ 3. Transloco
- Translation JSON files in `assets/i18n/`
- Keys follow `context.key` naming.
- Example en.json:
```json
{
  "users": {
    "title": "Users List",
    "add": "Add User"
  }
}
```
- Use pipe in templates:
```html
{{ 'users.title' | transloco }}
```
- Or use service:
```ts
inject(TranslocoService).translate('users.add');
```

---

### ✅ 4. RxDB Local-First
- Types go in `core/local-first/types/`
- Schema files in `core/local-first/schema/`
- Business logic for collections in `core/local-first/units/`
- Database connection in `database.service.ts`
- Collection abstraction in `collection.service.ts`

Example schema:
```ts
export const userSchema = {
  title: 'user schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  },
  required: ['id', 'name']
};
```

---

### ✅ 5. Theming & Styling
- Customize colors using **CSS variables**
- Global variables in `src/theme/variables.scss`
- Always use `--ion-color-primary` for colors.

---

### ✅ 6. Naming Conventions

| Entity             | Format                |
|:------------------|:---------------------|
| Components         | `PascalCase`          |
| Services           | `PascalCase`          |
| Interfaces         | `IPascalCase`         |
| Signal variables   | `camelCaseSignal`     |
| RxDB collections   | `plural-kebab-case`   |

---

### ✅ 7. Best Practices
- **No NgModules** except for Angular Material.
- One component + route per page.
- One service per resource (e.g., user.service.ts, product.service.ts)
- Always provide a Transloco fallback locale.
- RxDB data inside services + signal for local UI state.
- Enforce ESLint + Prettier.
- Use Conventional Commits.

---

### 📌 8. Example — Full Flow  

**core/local-first/types/user.ts**
```ts
export interface IUser {
  id: string;
  name: string;
}
```

**core/local-first/schema/user.schema.ts**
```ts
export const userSchema = {
  title: 'user schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  },
  required: ['id', 'name']
};
```

**core/services/user.service.ts**
```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private users = signal<IUser[]>([]);
  get all() { return this.users; }

  constructor(private db: RxdbService) {
    this.db.users$.subscribe(users => this.users.set(users));
  }
}
```

**assets/i18n/en.json**
```json
{
  "users": {
    "title": "User List"
  }
}
```

**pages/user-list/user-list.component.ts**
```ts
@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [IonicModule, TranslocoModule],
  template: `<h1>{{ 'users.title' | transloco }}</h1>`
})
export class UserListComponent {}
```

---

## ✅ Summary

- Angular v19 uses **standalone components** and `inject()` API.
- Ionic 8 prefers **CSS variables** for theming.
- Transloco for i18n with `assets/i18n` JSON files.
- RxDB as local-first database with schema definitions.
- Clean and consistent project structure.
- Signals for local UI state and RxJS for streams.
- Enforce ESLint + Prettier and Conventional Commits.

---
