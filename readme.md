# Laravel PHP Class Generator

**Laravel PHP Class Generator** is a VS Code extension that automatically generates PHP class boilerplate following Laravel's folder structure conventions.  
It detects the correct **PSR-4 namespace** based on the file location inside the `app/` directory and uses the filename as the class name.

Ideal for controllers, services, repositories, models, and any class within a Laravel application.

---

## ✨ Features

- **Automatically detects namespace** based on the file path  
  Example:  
  `app/Http/Controllers/Admin/UserController.php`  
  → `namespace App\Http\Controllers\Admin;`

- **Uses the filename as the class name**  
  Example:  
  `UserController.php` → `class UserController`

- Generates a clean class template:

```php
<?php

namespace App\Http\Controllers;

class ExampleController
{
    public function __construct()
    {
        //
    }
}


