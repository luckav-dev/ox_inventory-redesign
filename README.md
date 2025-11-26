<div align="center">

# 📦 ox_inventory - 2025 Redesign

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![FiveM](https://img.shields.io/badge/FiveM-Compatible-blue.svg)](https://fivem.net/)
[![ox_lib](https://img.shields.io/badge/Dependency-ox__lib-green.svg)](https://github.com/overextended/ox_lib)
[![oxmysql](https://img.shields.io/badge/Dependency-oxmysql-orange.svg)](https://github.com/overextended/oxmysql)

**Complete slot-based inventory system for FiveM with metadata support - Redesigned for 2025**

[Features](#-features) • [Preview](#-preview) • [Installation](#-installation) • [Documentation](#-documentation) • [Support](#-support)

</div>

---

## 🎨 Preview

### Modern Redesigned Interface

![Inventory Interface](https://media.discordapp.net/attachments/1426243828758876273/1443029571430645841/image.png?ex=69279584&is=69264404&hm=b63337bbfbbb9476eb4b90c59740278cb1a3997e2bbd3d29b7a1728b1a3560af&=&format=webp&quality=lossless&width=1796&height=902)

![Inventory System](https://media.discordapp.net/attachments/1426243828758876273/1443029621561098540/image.png?ex=6927958f&is=6926440f&hm=3a9a30d56fcbfeb1572d5701a473d552624e8edcbdfbc18f2431fd7bce02b5b2&=&format=webp&quality=lossless&width=1794&height=902)

*Completely redesigned UI with enhanced user experience and modern aesthetics*

---

## ✨ Features

### Core System

✅ **Slot-Based Inventory** - Advanced per-slot item storage with customizable metadata  
✅ **Multi-Framework Support** - Compatible with ox_core, ESX, QBCore, and nd_core  
✅ **Weapon System Override** - Complete weapon-as-items implementation  
✅ **Server-Side Security** - All interactions validated server-side  
✅ **Synchronized Access** - Multiple players can access the same inventory simultaneously  
✅ **Event Logging** - Comprehensive logging for purchases, transfers, and item creation/removal  

### Item System

✅ **Metadata Support** - Full item uniqueness with customizable metadata  
✅ **Weapon Attachments** - Complete attachment system for weapons  
✅ **Ammo System** - Special ammo types and management  
✅ **Durability System** - Items degrade or expire over time  
✅ **Item Effects** - Secure internal item use handling  
✅ **Framework Integration** - Compatible with 3rd party item registration  

### Shop System

✅ **Group Restrictions** - Access control based on groups and licenses  
✅ **Multiple Currencies** - Support for black money, poker chips, and custom currencies  
✅ **Dynamic Pricing** - Configurable item prices and stock  
✅ **Purchase Logging** - Complete transaction history  

### Stash System

✅ **Personal Stashes** - Player-specific or identifier-linked storage  
✅ **Group Access** - Restricted access based on player groups  
✅ **Dynamic Registration** - Register new stashes from any resource  
✅ **Container Items** - Paperbags, backpacks, and other container items  
✅ **Vehicle Storage** - Gloveboxes and trunks for all vehicles  
✅ **Random Loot** - Item generation in dumpsters and unowned vehicles  

---

## 📦 Requirements

- **FiveM Server** (Latest Artifact Recommended)
- **ox_lib** (Required Dependency)
- **oxmysql** (MySQL Resource)
- **One of the following frameworks**:
  - ox_core (Recommended)
  - ESX Legacy
  - QBCore/Qbox
  - nd_core
- **MySQL/MariaDB Database**

---

## 🚀 Installation

### 1. Download & Extract

Download the latest release and extract to your server's `resources` directory.

```
server-data/
└── resources/
    └── ox_inventory/
        ├── fxmanifest.lua
        ├── data/
        ├── modules/
        ├── web/
        └── ...
```

### 2. Install Dependencies

Ensure the following resources are installed and started **before** ox_inventory:

```
ensure ox_lib
ensure oxmysql
ensure [your-framework]  # ox_core, es_extended, qb-core, or nd_core
```

### 3. Database Setup

The resource will automatically create necessary database tables on first start. Alternatively, you can manually import the SQL file if provided.

### 4. Configuration

Edit the configuration files in the `data/` folder to customize:

- Item definitions
- Weapon configurations
- Shop locations and inventories
- Stash settings
- Vehicle storage capacities

### 5. Add to `server.cfg`

```
ensure ox_lib
ensure oxmysql
ensure ox_inventory
```

### 6. Start Server

Restart your FiveM server or use:

```
refresh
ensure ox_inventory
```

---

## 📚 Documentation

Full documentation is available at:

**[https://overextended.dev/ox_inventory](https://overextended.dev/ox_inventory)**

Documentation includes:

- Item creation and registration
- Weapon configuration
- Shop setup and management
- Stash creation and usage
- API reference and exports
- Framework integration guides
- Advanced customization

## 🛠️ Troubleshooting

### Inventory Not Opening

- ✅ Ensure `ox_lib` is started before `ox_inventory`
- ✅ Check for errors in F8 console
- ✅ Verify framework is properly installed
- ✅ Clear FiveM cache (`%localappdata%\FiveM\FiveM.app\data\cache`)

### Items Not Saving

- ✅ Verify `oxmysql` is running correctly
- ✅ Check database connection in `server.cfg`
- ✅ Ensure database tables were created
- ✅ Check server console for MySQL errors

### Weapons Not Working

- ✅ Ensure `setr inventory:framework "framework_name"` in `server.cfg`
- ✅ Verify weapon items are properly registered
- ✅ Check weapon metadata configuration
- ✅ Review framework-specific weapon setup

### Performance Issues

- ✅ Reduce max inventory slots if needed
- ✅ Optimize database queries
- ✅ Limit simultaneous stash access
- ✅ Check for resource conflicts

---

## 🔧 Advanced Configuration

### Custom Item Registration

```
exports.ox_inventory:RegisterItem('item_name', {
    label = 'Item Label',
    weight = 100,
    stack = true,
    close = false,
    description = 'Item description',
    client = {
        usetime = 2500,
        export = 'resource.function'
    }
})
```

### Creating Shops

```
exports.ox_inventory:RegisterShop('shop_name', {
    name = 'Shop Display Name',
    blip = { sprite = 59, colour = 69, scale = 0.8 },
    inventory = {
        { name = 'item_name', price = 10 },
        { name = 'item_name2', price = 25, currency = 'black_money' }
    },
    groups = { 'police', 'ambulance' }
})
```

### Creating Stashes

```
exports.ox_inventory:RegisterStash('stash_id', {
    owner = true,
    slots = 50,
    weight = 100000,
    groups = { 'police' }
})
```

---

## 🆕 2025 Redesign Changes

This version is a complete UI/UX redesign based on [@l0d's redesign](https://github.com/Lod-Resources/ox_inventory) of the original [ox_inventory by Overextended](https://github.com/overextended/ox_inventory).

### Design Evolution

**Original** → [@l0d](https://github.com/Lod-Resources/ox_inventory) → **xoxo pistolas (onyx)** *(This Version)*

### Visual Improvements

- 🎨 Modern, clean interface design
- 🌈 Enhanced color scheme and contrast
- 📱 Improved responsive layout
- ✨ Smooth animations and transitions
- 🎯 Better item preview system
- 💎 Refined visual hierarchy

### Functionality Enhancements

- ⚡ Optimized performance
- 🔄 Improved drag-and-drop mechanics
- 🔍 Better search and filtering
- 📊 Enhanced metadata display
- 🎮 Improved gamepad support
- 🚀 Faster load times

---

## 📄 License

Copyright © 2025 **xoxo pistolas (onyx)** (2025 Redesign)  
Copyright © 2024 [@l0d](https://github.com/Lod-Resources) (Base Redesign)  
Copyright © 2024 [Overextended](https://github.com/overextended) (Original)

This program is free software: you can redistribute it and/or modify it under the terms of the **GNU General Public License v3.0** as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).

---

## 🤝 Support

### Official Resources

- **Original Documentation**: [Overextended Docs](https://overextended.dev/ox_inventory)
- **Original Repository**: [overextended/ox_inventory](https://github.com/overextended/ox_inventory)
- **Base Redesign**: [Lod-Resources/ox_inventory](https://github.com/Lod-Resources/ox_inventory)

### Get Help

- **Discord**: Contact **onyx** for support and questions
- **Issues**: [Report Issues](https://github.com/yourusername/ox_inventory/issues)
- **Community**: Join our Discord server for updates and support

*For any questions, suggestions, or support, feel free to reach out via Discord!*

---

## 🌟 Credits

**Original Development**: [Overextended Team](https://github.com/overextended)  
**Base Redesign (2024)**: [@l0d](https://github.com/Lod-Resources)  
**2025 Redesign**: **xoxo pistolas (onyx)**

Special thanks to:
- The original ox_inventory developers for creating an outstanding foundation
- @l0d for the initial redesign work
- The FiveM community for continuous feedback and support

If you find this redesign helpful, please consider giving it a ⭐ on GitHub!

---

<div align="center">

**[⬆ Back to Top](#-ox_inventory---2025-redesign)**

</div>
