<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <title>Сборка ядра Linux 7.3 для AMD Ryzen</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
            background: #ffffff;
            color: #000000;
            scroll-behavior: smooth;
        }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; border-bottom: 2px solid #e67e22; padding-bottom: 5px; scroll-margin-top: 20px; }
        h3 { color: #d35400; }
        pre {
            background: #f4f4f4;
            color: #000000;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid #ccc;
        }
        code {
            background: #f4f4f4;
            color: #d14;
            padding: 2px 5px;
            border-radius: 4px;
        }
        pre code {
            background: transparent;
            color: #000000;
            padding: 0;
        }
        table { border-collapse: collapse; width: 100%; margin: 15px 0; background: #ffffff; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #e67e22; color: white; }
        .note { background: #fff3cd; border-left: 5px solid #ffc107; padding: 10px; margin: 15px 0; }
        .warning { background: #f8d7da; border-left: 5px solid #dc3545; padding: 10px; margin: 15px 0; }
        .success { background: #d4edda; border-left: 5px solid #28a745; padding: 10px; margin: 15px 0; }
        .opt { background: #d1ecf1; border-left: 5px solid #17a2b8; padding: 10px; margin: 15px 0; }
        .license { background: #e8e8e8; border: 1px solid #999; padding: 15px; margin: 20px 0; font-family: monospace; white-space: pre-wrap; }
        hr { margin: 20px 0; }
        a { color: #d35400; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .toc a { font-weight: bold; }
        .back-to-top {
            display: inline-block;
            margin-top: 10px;
            font-size: 0.9em;
            color: #e67e22;
            font-weight: bold;
        }
        .back-to-top:hover { text-decoration: underline; }

        /* ===== Версия для печати / PDF ===== */
        @media print {
            body {
                margin: 15mm;
                font-size: 11pt;
                line-height: 1.4;
                color: #000;
                background: #fff;
            }
            h1 { font-size: 22pt; color: #000; }
            h2 {
                font-size: 16pt;
                color: #000;
                border-bottom: 1px solid #000;
                page-break-after: avoid;
            }
            h3 { font-size: 13pt; color: #000; page-break-after: avoid; }
            pre, table, .note, .warning, .success, .opt, .license {
                page-break-inside: avoid;
            }
            pre {
                background: #f4f4f4 !important;
                border: 1px solid #999;
                color: #000 !important;
            }
            code { color: #000 !important; background: #eee !important; }
            th { background: #ddd !important; color: #000 !important; }
            a { color: #000 !important; text-decoration: none; }
            .back-to-top { display: none !important; }
            .toc a { color: #000 !important; }
            hr { border: none; border-top: 1px solid #999; }
            .note, .warning, .success, .opt, .license {
                background: #f9f9f9 !important;
                border-left: 3px solid #000 !important;
            }
        }
    </style>
</head>
<body id="top">

<h1>🐧 Сборка ядра Linux 7.3</h1>
<p><strong>Максимальная производительность, стабильность и безопасность</strong><br/>
🔹 <strong>Для всех процессоров AMD Ryzen (Zen 1, Zen+, Zen 2, Zen 3, Zen 4, Zen 5)</strong></p>
<p><strong>Автор:</strong> EvgenBull «Быков Евгений»</p>
<hr/>

<h2>📑 Содержание</h2>
<ol class="toc">
    <li><a href="#section-1">Подготовка системы</a></li>
    <li><a href="#section-2">Загрузка исходного кода</a></li>
    <li><a href="#section-3">Установка инструментов сборки</a></li>
    <li><a href="#section-4">Настройка ядра</a></li>
    <li><a href="#section-5">Флаги компиляции под Ryzen</a></li>
    <li><a href="#section-6">Сборка и создание .deb-пакетов (без отладочного пакета)</a></li>
    <li><a href="#section-7">Установка ядра</a></li>
    <li><a href="#section-8">Настройка загрузчика (рекомендовано)</a></li>
    <li><a href="#section-9">Проверка</a></li>
    <li><a href="#section-10">Откат к старому ядру</a></li>
    <li><a href="#section-11">Лицензия и правоприемственность</a></li>
    <li><a href="#section-12">Сборка только нужных модулей (localmodconfig)</a></li>
</ol>
<hr/>

<h2 id="section-1">1. Подготовка системы</h2>
<pre><code>mkdir -p ~/kernel-7.3
cd ~/kernel-7.3

sudo apt update && sudo apt upgrade -y</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<h2 id="section-2">2. Загрузка исходного кода ядра 7.3</h2>
<pre><code>wget https://cdn.kernel.org/pub/linux/kernel/v7.x/linux-7.3.tar.xz
tar -xf linux-7.3.tar.xz
cd linux-7.3</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<h2 id="section-3">3. Установка инструментов сборки</h2>
<pre><code>sudo apt install -y \
    build-essential libncurses-dev bison flex libssl-dev libelf-dev \
    fakeroot bc rustc bindgen clang python3 pahole debhelper libdw-dev \
    gawk cpio rsync ccache libzstd-dev git dwarves</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<h2 id="section-4">4. Настройка ядра</h2>

<h3>4.1 Базовый конфиг (из текущей системы)</h3>
<pre><code>cp /boot/config-$(uname -r) .config
make olddefconfig</code></pre>

<div class="note">
    💡 Предупреждения вида <code>symbol value 'm' invalid for ...</code> — нормальны. <code>make olddefconfig</code> автоматически исправляет устаревшие значения.
</div>

<h3>4.2 Обязательные технические правки (убираем ограничения)</h3>
<pre><code>scripts/config --disable SYSTEM_TRUSTED_KEYS
scripts/config --disable SYSTEM_REVOCATION_KEYS
scripts/config --set-str CONFIG_SYSTEM_TRUSTED_KEYS ""
scripts/config --set-str CONFIG_SYSTEM_REVOCATION_KEYS ""
scripts/config --disable RUST
scripts/config --disable DEBUG_INFO_BTF</code></pre>

<h3>4.3 Ручная настройка через <code>make menuconfig</code></h3>
<pre><code>make menuconfig</code></pre>

<h3>✅ Процессор и архитектура</h3>

<table>
    <thead>
        <tr><th>Раздел меню</th><th>Параметр</th><th>Значение для Ryzen</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><code>Processor type and features</code></td>
            <td><code>build and optimize for local/native CPU</code></td>
            <td><code>[*]</code> (включить)</td>
        </tr>
        <tr>
            <td><code>Processor type and features</code></td>
            <td><code>support AMD processors</code></td>
            <td><code>[*]</code> (включить)</td>
        </tr>
        <tr>
            <td><code>Processor type and features</code></td>
            <td><code>support Intel processors</code></td>
            <td><code>[ ]</code> (отключить)</td>
        </tr>
    </tbody>
</table>

<h3>⚙️ Отзывчивость системы (Preemption)</h3>
<p><strong>General setup → Preemption Model</strong><br/>
Выбрать:</p>
<pre><code>Preemptible Kernel (Low-Latency Desktop)</code></pre>

<div class="note">
    💡 Не включайте <code>Fully Preemptible Kernel (Real-Time)</code> — для обычного десктопа это не требуется.
</div>

<h3>⏱️ Частота таймера</h3>
<p><strong>General setup → Timer frequency</strong><br/>
Выбрать:</p>
<pre><code>300 Hz</code></pre>

<h3>🔋 Управление питанием и частотой (ключевое для Ryzen)</h3>
<p><strong>Power Management → CPU Frequency scaling</strong></p>

<table>
    <thead>
        <tr><th>Параметр</th><th>Значение</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><code>Default CPUFreq governor</code></td>
            <td><code>schedutil</code></td>
        </tr>
        <tr>
            <td><code>Intel P state control</code></td>
            <td><code>[ ]</code> (отключить)</td>
        </tr>
        <tr>
            <td><code>AMD Processor P-State driver</code></td>
            <td><code>[*]</code> (встроен)</td>
        </tr>
        <tr>
            <td><code>AMD Processor P-State default mode</code></td>
            <td><code>(3)</code> Guided mode</td>
        </tr>
        <tr>
            <td><code>ACPI Processor P-States driver</code></td>
            <td><code>[ ]</code> (отключить)</td>
        </tr>
    </tbody>
</table>

<div class="opt">
    🧠 <strong>Почему отключаем ACPI P-States?</strong><br/>
    Чтобы система гарантированно использовала современный <code>amd-pstate</code>, а не устаревший <code>acpi-cpufreq</code>.
</div>

<h3>🛡️ IOMMU (безопасность и виртуализация)</h3>
<p><strong>Device Drivers → IOMMU Hardware Support</strong></p>

<table>
    <thead>
        <tr><th>Параметр</th><th>Значение</th></tr>
    </thead>
    <tbody>
        <tr>
            <td><code>AMD IOMMU support</code></td>
            <td><code>[*]</code> (включить)</td>
        </tr>
        <tr>
            <td><code>Support for Intel IOMMU</code></td>
            <td><code>[ ]</code> (отключить)</td>
        </tr>
        <tr>
            <td><code>IOMMU default domain type</code></td>
            <td><code>Translated - Strict</code></td>
        </tr>
    </tbody>
</table>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-5">5. Флаги компиляции (оптимизация под Ryzen)</h2>

<p>Выберите подходящий вариант для вашего поколения Ryzen:</p>

<table>
    <thead>
        <tr><th>Поколение Ryzen</th><th>Архитектура</th><th>Флаг <code>-march</code></th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Ryzen 1000 / 2000</td>
            <td>Zen / Zen+</td>
            <td><code>znver1</code></td>
        </tr>
        <tr>
            <td>Ryzen 3000 / 4000 (H/U)</td>
            <td>Zen 2</td>
            <td><code>znver2</code></td>
        </tr>
        <tr>
            <td>Ryzen 5000 / 6000</td>
            <td>Zen 3 / Zen 3+</td>
            <td><code>znver3</code></td>
        </tr>
        <tr>
            <td>Ryzen 7000 / 8000 / 9000</td>
            <td>Zen 4 / Zen 5</td>
            <td><code>znver4</code></td>
        </tr>
    </tbody>
</table>

<div class="opt">
    <strong>Пример для большинства систем (автоопределение):</strong>
    <pre><code>export CFLAGS="-O2 -march=native -mtune=native -pipe -fno-plt -fomit-frame-pointer"
export CXXFLAGS="$CFLAGS"</code></pre>

    <strong>Пример для точной настройки (Zen 2):</strong>
    <pre><code>export CFLAGS="-O2 -march=znver2 -mtune=znver2 -pipe -fno-plt -fomit-frame-pointer"
export CXXFLAGS="$CFLAGS"</code></pre>
</div>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-6">6. Сборка и создание .deb-пакетов (без отладочного пакета)</h2>

<div class="warning">
    ⚠️ Для ядер 6.x+ используется <code>bindeb-pkg</code>, а не <code>deb-pkg</code>.<br/>
    ⚠️ Отладочный пакет <code>-dbg</code> содержит символы для всех модулей (включая огромный <code>nouveau.ko</code>) и может занимать <strong>несколько гигабайт</strong>. Его сборка часто приводит к ошибке <code>На устройстве не осталось свободного места</code>.
</div>

<p>Используйте профиль сборки, исключающий <code>-dbg</code>:</p>

<pre><code>DEB_BUILD_OPTIONS=nocheck \
DEB_BUILD_PROFILES="pkg.linux-upstream.nokerneldbg" \
make -j$(nproc) bindeb-pkg \
    LOCALVERSION=-ryzen-7.3-optimized \
    KDEB_PKGVERSION=1</code></pre>

<p><strong>Пояснение параметров:</strong></p>
<ul>
    <li><code>-j$(nproc)</code> — использует все ядра процессора для ускорения сборки</li>
    <li><code>DEB_BUILD_PROFILES="pkg.linux-upstream.nokerneldbg"</code> — <strong>исключает сборку отладочного пакета</strong> (рекомендуется)</li>
    <li><code>LOCALVERSION=-ryzen-7.3-optimized</code> — метка вашей сборки</li>
    <li><code>KDEB_PKGVERSION=1</code> — версия пакета</li>
</ul>

<div class="note">
    💡 Если ваш Makefile не поддерживает <code>DEB_BUILD_PROFILES</code>, используйте альтернативу:
    <pre><code>make DEB_EXCLUDE_PKG="linux-image-%-dbg" bindeb-pkg ...</code></pre>
</div>

<p>⏱️ <strong>Время сборки:</strong> 30–90 минут в зависимости от процессора.</p>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-7">7. Установка ядра</h2>

<pre><code>cd ~/kernel-7.3
sudo dpkg -i linux-image-7.3.0-ryzen-7.3-optimized_1_amd64.deb
sudo dpkg -i linux-headers-7.3.0-ryzen-7.3-optimized_1_amd64.deb
sudo update-grub
sudo reboot</code></pre>

<p>После перезагрузки проверьте версию:</p>
<pre><code>uname -r</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-8">8. Настройка загрузчика (рекомендовано для стабильности)</h2>

<p>Для предотвращения редких зависаний на Ryzen (особенно мобильных) добавьте параметры в <code>/etc/default/grub</code>:</p>

<pre><code>sudo nano /etc/default/grub</code></pre>

<p>Приведите строку <code>GRUB_CMDLINE_LINUX_DEFAULT</code> к виду:</p>

<pre><code>GRUB_CMDLINE_LINUX_DEFAULT="quiet splash processor.max_cstate=1 rcu_nocbs=0-15"</code></pre>

<p><strong>Пояснение:</strong></p>
<ul>
    <li><code>processor.max_cstate=1</code> — запрещает глубокие C-состояния (решает проблемы с зависаниями)</li>
    <li><code>rcu_nocbs=0-15</code> — исключает все потоки из RCU callback (снижает задержки)</li>
</ul>

<p>Затем обновите GRUB:</p>
<pre><code>sudo update-grub
sudo reboot</code></pre>

<div class="note">
    💡 Если ваша система работает стабильно без этих параметров — их можно не добавлять.
</div>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-9">9. Проверка работы ядра</h2>

<h3>Драйвер управления частотой:</h3>
<pre><code>cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_driver
# Ожидается: amd-pstate</code></pre>

<h3>Губернатор частоты:</h3>
<pre><code>cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
# Ожидается: schedutil</code></pre>

<h3>Ошибки ACPI / C-state:</h3>
<pre><code>dmesg | grep -i "error\|acpi\|cstate" | head -20</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-10">10. Откат к старому ядру</h2>

<p>Если новое ядро не загружается или работает нестабильно:</p>

<ol>
    <li>Перезагрузите компьютер</li>
    <li>В меню GRUB выберите <strong>Advanced options</strong> → предыдущее рабочее ядро</li>
    <li>После входа в систему удалите проблемное ядро:</li>
</ol>

<pre><code># Узнайте точное имя пакета
dpkg -l | grep linux-image

# Удалите (замените на вашу версию)
sudo apt purge linux-image-7.3.0-ryzen-7.3-optimized linux-headers-7.3.0-ryzen-7.3-optimized

# Обновите GRUB
sudo update-grub</code></pre>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-11">11. Лицензия и правоприемственность</h2>

<div class="license">
ЛИЦЕНЗИЯ НА ПРАВОПРЕЕМСТВЕННОСТЬ (Succession License)

Настоящим документом подтверждается право правоприемственности на данное
руководство и все производные работы, созданные на его основе.

Автор и правообладатель: EvgenBull «Быков Евгений»
Версия руководства: 5.0 (обновлено для ядра Linux 7.3)
Дата: 2026

Разрешается:
  - Свободное использование, копирование и распространение руководства
    в неизменном виде с сохранением данного блока лицензии.
  - Создание производных работ (переводы, адаптации, дополнения) при
    условии указания авторства и сохранения духа настоящей лицензии.

Запрещается:
  - Присвоение авторства без указания оригинального источника.
  - Распространение вредоносных или намеренно искажённых версий
    руководства под тем же именем.

Правоприемственность:
  - Любая производная работа автоматически наследует условия настоящей
    лицензии (принцип "наследования" — copyleft).
  - При прекращении поддержки оригинального руководства сообщество
    имеет право продолжить его развитие под тем же именем при условии
    сохранения данного блока лицензии.

Отказ от гарантий:
  ДАННОЕ РУКОВОДСТВО ПРЕДОСТАВЛЯЕТСЯ "КАК ЕСТЬ", БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ,
  ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ. АВТОР НЕ НЕСЁТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБОЙ
  УЩЕРБ, ВОЗНИКШИЙ В РЕЗУЛЬТАТЕ ИСПОЛЬЗОВАНИЯ ИЛИ НЕВОЗМОЖНОСТИ
  ИСПОЛЬЗОВАНИЯ ДАННОГО РУКОВОДСТВА.
</div>
<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<h2 id="section-12">12. Сборка только нужных модулей (localmodconfig)</h2>

<p>Если вы хотите собрать ядро <strong>только с теми драйверами, которые реально используются вашим оборудованием</strong> — это резко сократит время сборки, размер пакета и расход места на диске. Особенно полезно на слабых дисках или при нехватке свободного пространства.</p>

<div class="note">
    💡 <code>localmodconfig</code> анализирует <strong>текущее загруженное ядро</strong> и его модули (<code>lsmod</code>), а затем автоматически отключает всё, что не используется. Будьте осторожны: если какое-то устройство не было подключено в момент настройки (USB-адаптер, Bluetooth, звуковая карта), его драйвер может не попасть в сборку.
</div>

<h3>12.1 Как это работает</h3>
<ol>
    <li>Выполняется сканирование текущей системы на предмет загруженных модулей.</li>
    <li>Скрипт задаёт вопросы о параметрах, которые он не смог однозначно определить (можно отвечать по умолчанию — Enter).</li>
    <li>В <code>.config</code> остаются только нужные драйверы, остальные отключаются.</li>
</ol>

<h3>12.2 Пошаговая инструкция</h3>

<p><strong>Шаг 1. Базовая настройка (если ещё не делали):</strong></p>
<pre><code>cd ~/kernel-7.3/linux-7.3
cp /boot/config-$(uname -r) .config
make olddefconfig</code></pre>

<p><strong>Шаг 2. Запуск <code>localmodconfig</code>:</strong></p>
<pre><code>make localmodconfig</code></pre>

<p>Скрипт задаст несколько вопросов вида:</p>
<pre><code>Enable loadable module support (MODULES) [Y/n/?] 
...</code></pre>
<p>На большинство можно смело нажимать <strong>Enter</strong> (значение по умолчанию).</p>

<div class="warning">
    ⚠️ Перед запуском убедитесь, что <strong>все нужные устройства подключены</strong> (флешки, внешние диски, Bluetooth-наушники и т.п.), иначе их драйверы могут быть отключены.
</div>

<p><strong>Шаг 3. Обязательные правки (как в разделе 4.2):</strong></p>
<pre><code>scripts/config --disable SYSTEM_TRUSTED_KEYS
scripts/config --disable SYSTEM_REVOCATION_KEYS
scripts/config --set-str CONFIG_SYSTEM_TRUSTED_KEYS ""
scripts/config --set-str CONFIG_SYSTEM_REVOCATION_KEYS ""
scripts/config --disable RUST
scripts/config --disable DEBUG_INFO_BTF</code></pre>

<p><strong>Шаг 4. Финальная проверка конфига:</strong></p>
<pre><code>make olddefconfig</code></pre>

<p><strong>Шаг 5. Сборка пакетов (без <code>-dbg</code>):</strong></p>
<pre><code>DEB_BUILD_OPTIONS=nocheck \
DEB_BUILD_PROFILES="pkg.linux-upstream.nokerneldbg" \
make -j$(nproc) bindeb-pkg \
    LOCALVERSION=-ryzen-7.3-minimal \
    KDEB_PKGVERSION=1</code></pre>

<h3>12.3 Плюсы и минусы</h3>

<table>
    <thead>
        <tr><th>Плюсы</th><th>Минусы</th></tr>
    </thead>
    <tbody>
        <tr>
            <td>Сборка в 3–5 раз быстрее</td>
            <td>Можно случайно отключить драйвер для устройства, которого не было при настройке</td>
        </tr>
        <tr>
            <td>Пакет весит в разы меньше</td>
            <td>Меньше совместимость с «чужим» железом</td>
        </tr>
        <tr>
            <td>Меньше места на диске</td>
            <td>При смене оборудования может потребоваться пересборка</td>
        </tr>
    </tbody>
</table>

<div class="success">
    💡 <strong>Совет:</strong> если вы собираете ядро «для себя» и не планируете переносить его на другие машины — <code>localmodconfig</code> идеален. Если хотите универсальное ядро — используйте обычный <code>olddefconfig</code> (раздел 4.1).
</div>

<p>После установки такого ядра проверьте, что всё работает:</p>
<pre><code>uname -r
lsmod | wc -l
# Сравните количество модулей с прежним ядром — их должно стать заметно меньше</code></pre>

<a class="back-to-top" href="#top">↑ Наверх</a>

<hr/>

<div class="success">
    <strong>🎉 Готово! Вы собрали оптимизированное ядро 7.3 для вашего Ryzen.</strong><br/>
    ✅ Максимальная производительность<br/>
    ✅ Современный драйвер <code>amd-pstate</code> (Guided mode)<br/>
    ✅ Отключена вся Intel-специфичная логика<br/>
    ✅ Низкая задержка (Low-Latency Preemption)<br/>
    ✅ Сборка без отладочного пакета — экономия места на диске<br/>
    ✅ Возможность собрать минимальное ядро через <code>localmodconfig</code><br/>
    ✅ Рекомендованные параметры стабильности
</div>

<hr/>

<p><em>📅 Руководство для ядра Linux 7.3. EvgenBull Разработано «Быков Евгений»<br/>
🖥️ Протестировано на процессорах AMD Ryzen (Zen 1–Zen 5)<br/>
🐧 Linux Mint / Debian / Ubuntu / производные<br/>
🔗 Лицензия: Succession License (см. раздел 11)</em></p>

<p style="margin-top: 30px; text-align: right; font-size: 1.1em;">
    <strong>Автор EvgenBull — «Быков Евгений»</strong>
</p>

</body>
</html>
