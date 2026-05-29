import React, { useState, useEffect } from 'react';
import { 
    Panel, 
    Grid, 
    Container, 
    Flex, 
    Avatar, 
    Typography, 
    Button, 
    CellGroup, 
    CellSimple, 
    Badge 
} from '@maxhub/max-ui';

/**
 * Основной компонент Личного кабинета студии движения «РЕСУРС»
 * Построен на базе дизайн-системы MAX UI с применением Bento-сетки и Глассморфизма
 */
const App = () => {
    // Временные "mock-данные" для тестирования интерфейса до финального подключения CRM Listok
    const [clientProfile, setClientProfile] = useState({
        name: "Елена Иванова",
        phone: "+7 (908) 715-55-57",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        isOnline: true,
        // Текущий активный абонемент клиента в CRM
        subscription: {
            title: "Умный фитнес & Растяжка",
            totalLessons: 16,
            leftLessons: 12,
            expirationDate: "25.06.2026"
        }
    });

    // Список доступных направлений студии для записи
    const directions = [
        { id: "pilates", title: "Умный Пилатес", type: "Спокойствие", duration: "50 мин" },
        { id: "back", title: "Здоровая спина", type: "Спокойствие", duration: "50 мин" },
        { id: "mfr", title: "Миофасциальный релиз (МФР)", type: "Спокойствие", duration: "50 мин" },
        { id: "aerostretching", title: "Аэростретчинг в гамаках", type: "Легкость", duration: "50 мин" },
        { id: "sculpt", title: "Body sculpt / Подкачка", type: "Энергия", duration: "50 min" },
        { id: "tabata", title: "Табата / Круговая", type: "Энергия", duration: "50 мин" }
    ];

    // Доступные модули пополнения баланса и покупки новых абонементов
    const pricePackages = [
        { id: "pack16", lessons: 16, price: 11200, discount: 5, description: "Старт практики" },
        { id: "pack48", lessons: 48, price: 22400, discount: 10, description: "Уверенный прогресс" },
        { id: "pack64", lessons: 64, price: 44800, discount: 15, description: "Эволюция тела (Максимальная выгода)" }
    ];

    // Управление состоянием системной темы оформления (Светлая / "Тень")
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Функция-заглушка для обработки будущей записи через виджет или API Листка
    const handleBooking = (directionTitle) => {
        alert(`Запрос на запись по направлению "${directionTitle}" на ул. Коммунистическая 77/2 отправлен в Листок CRM.`);
    };

    // Функция-заглушка для симуляции покупки абонемента через Робокассу / ЮKassa
    const handlePurchase = (packageInfo) => {
        alert(`Перенаправление на Робокассу. Сумма к оплате: ${packageInfo.price} руб. Пакет: ${packageInfo.lessons} занятий.`);
    };

    return (
        <Panel mode="secondary" className="app-layout" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            
            {/* ШАПКА ПРИЛОЖЕНИЯ С ЭФФЕКТОМ МАТОВОГО СТЕКЛА */}
            <header className="transparent-blur-header" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Flex align="center" gap={10}>
                    <img src="logo_header_final.png" alt="РЕСУРС" style={{ height: '32px', width: '32px', borderRadius: '6px' }} 
                         onError={(e) => { e.target.src = "https://via.placeholder.com/32/967BB6/FFFFFF?text=R"; }} />
                    <Typography.Title level={3} style={{ fontFamily: 'var(--max-ui-font-serif)', letterSpacing: '4px', margin: 0 }}>
                        РЕСУРС
                    </Typography.Title>
                </Flex>
                <Button size="m" mode="ghost" className="btn-lens" onClick={toggleTheme} style={{ letterSpacing: '2px' }}>
                    {theme === 'dark' ? 'СВЕТ' : 'ТЕНЬ'}
                </Button>
            </header>

            {/* ОСНОВНОЙ КОНТЕНТНЫЙ КОНТЕЙНЕР (ОТСТУП СВЕРХУ ПОД ФИКСИРОВАННУЮ ШАПКУ) */}
            <Container style={{ marginTop: '80px', padding: '0 10px' }}>
                
                {/* ЗАГОЛОВОК И ТЕКУЩАЯ ГЕОЛОКАЦИЯ ФЛАГМАНСКОЙ СТУДИИ */}
                <div style={{ padding: '15px', textAlign: 'left' }}>
                    <Typography.Title level={2} style={{ fontFamily: 'var(--max-ui-font-serif)', marginBottom: '5px' }}>
                        Личный кабинет резидента
                    </Typography.Title>
                    <Typography.Text size="s" style={{ color: 'var(--max-ui-color-accent)', fontWeight: 600, letterSpacing: '1px' }}>
                        <i className="fa-solid fa-location-dot"></i> СТУДИЯ: ул. Коммунистическая, 77/2
                    </Typography.Text>
                </div>

                {/* МОДУЛЬНАЯ БЕНТО-СЕТКА ИНТЕРФЕЙСА */}
                <div className="bento-grid">
                    
                    {/* БЛОК 1 БЕНТО: ПРОФИЛЬ КЛИЕНТА И СТАТУС ВЕРИФИКАЦИИ */}
                    <div className="bento-card-glass">
                        <Flex direction="column" align="center" justify="center" gap={15}>
                            <Avatar.Container size={96} form="squircle" style={{ boxShadow: '0 8px 24px rgba(150,123,182,0.2)' }}>
                                <Avatar.Image src={clientProfile.avatarUrl} />
                                {clientProfile.isOnline && <Avatar.OnlineDot />}
                            </Avatar.Container>
                            <div style={{ textAlign: 'center' }}>
                                <Typography.Title level={3} style={{ marginBottom: '4px' }}>{clientProfile.name}</Typography.Title>
                                <Typography.Text size="m" style={{ opacity: 0.6 }}>{clientProfile.phone}</Typography.Text>
                            </div>
                            <Badge mode="gradient" style={{ background: 'linear-gradient(135deg, var(--max-ui-color-accent), #846226)', color: '#fff', padding: '6px 16px', borderRadius: '20px' }}>
                                ВЕРИФИЦИРОВАН ЧЕРЕЗ МАКС API
                            </Badge>
                        </Flex>
                    </div>

                    {/* БЛОК 2 БЕНТО: СОСТОЯНИЕ ТЕКУЩЕГО АБОНЕМЕНТА ИЗ CRM LISTOK */}
                    <div className="bento-card-glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontSize: '10px', textTransform: 'uppercase', letter-spacing: '2px', color: 'var(--max-ui-color-accent)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                                Активный статус
                            </span>
                            <Typography.Title level={3} style={{ marginBottom: '15px', fontFamily: 'var(--max-ui-font-serif)' }}>
                                {clientProfile.subscription.title}
                            </Typography.Title>
                            
                            <Flex align="baseline" gap={8} style={{ marginBottom: '10px' }}>
                                <span style={{ fontSize: '64px', fontWeight: 700, color: 'var(--max-ui-color-primary)', lineHeight: 1 }}>
                                    {clientProfile.subscription.leftLessons}
                                </span>
                                <Typography.Text size="l" style={{ opacity: 0.7 }}>
                                    из {clientProfile.subscription.totalLessons} занятий осталось
                                </Typography.Text>
                            </Flex>
                        </div>
                        
                        <div style={{ paddingTop: '15px', borderTop: '1px solid var(--max-ui-border-base)' }}>
                            <Typography.Text size="s" style={{ opacity: 0.5 }}>
                                Действует до: {clientProfile.subscription.expirationDate} (50 минут сессия)
                            </Typography.Text>
                        </div>
                    </div>

                    {/* БЛОК 3 БЕНТО: ДОСТУПНЫЕ ПРАКТИКИ И МГНОВЕННАЯ ЗАПИСЬ НА КОММУНИСТИЧЕСКУЮ */}
                    <div className="bento-card-glass" style={{ gridColumn: '1 / -1' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Typography.Title level={3} style={{ fontFamily: 'var(--max-ui-font-serif)', marginBottom: '5px' }}>
                                Запись на тренировки
                            </Typography.Title>
                            <Typography.Text size="m" style={{ opacity: 0.6 }}>
                                Выберите направление. Занятия проходят в нашей камереной студии на Коммунистической 77/2
                            </Typography.Text>
                        </div>

                        <Grid gap={12} cols={1} smCols={2} mdCols={3}>
                            {directions.map((dir) => (
                                <div key={dir.id} style={{ background: 'var(--max-ui-bg-element)', border: '1px solid var(--max-ui-border-base)', borderRadius: '16px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
                                    <div>
                                        <Flex justify="space-between" align="center" style={{ marginBottom: '5px' }}>
                                            <Badge mode="secondary" style={{ fontSize: '10px' }}>{dir.type}</Badge>
                                            <Typography.Text size="s" style={{ opacity: 0.5 }}>{dir.duration}</Typography.Text>
                                        </Flex>
                                        <Typography.Text size="l" style={{ fontWeight: 600, display: 'block', marginTop: '5px' }}>
                                            {dir.title}
                                        </Typography.Text>
                                    </div>
                                    <Button size="s" mode="primary" style={{ width: '100%', borderRadius: '8px' }} onClick={() => handleBooking(dir.title)}>
                                        Записаться
                                    </Button>
                                </div>
                            ))}
                        </Grid>
                    </div>

                    {/* БЛОК 4 БЕНТО: АВТОМАТИЗАЦИЯ ПРОДАЖ — МАГАЗИН АБОНЕМЕНТОВ С УЧЕТОМ СКИДОК ПОСЛЕ ПРОБНОГО */}
                    <div className="bento-card-glass" style={{ gridColumn: '1 / -1' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Typography.Title level={3} style={{ fontFamily: 'var(--max-ui-font-serif)', marginBottom: '5px' }}>
                                Продление ресурса тела
                            </Typography.Title>
                            <Typography.Text size="m" style={{ opacity: 0.6 }}>
                                Покупка модулей и абонементов напрямую через Робокассу с автоматическим зачислением в Listok CRM 24/7
                            </Typography.Text>
                        </div>

                        <Grid gap={16} cols={1} mdCols={3}>
                            {pricePackages.map((pack) => (
                                <div key={pack.id} style={{ background: 'var(--max-ui-bg-element)', border: '1px solid var(--max-ui-color-primary)', borderRadius: '20px', padding: '25px', display: 'flex', flexDirection: 'column', justifySpace: 'between', position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '15px', right: '-30px', background: 'var(--max-ui-color-accent)', color: '#000', padding: '4px 30px', transform: 'rotate(45deg)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        -{pack.discount}% сразу
                                    </div>
                                    
                                    <div style={{ marginBottom: '20px' }}>
                                        <Typography.Text size="m" style={{ opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            {pack.description}
                                        </Typography.Text>
                                        <Typography.Title level={2} style={{ margin: '10px 0 5px 0' }}>
                                            {pack.lessons} занятий
                                        </Typography.Title>
                                        <Typography.Text size="s" style={{ opacity: 0.6, display: 'block' }}>
                                            Срок действия модуля не ограничен
                                        </Typography.Text>
                                    </div>

                                    <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid var(--max-ui-border-base)' }}>
                                        <Flex justify="space-between" align="center" style={{ marginBottom: '15px' }}>
                                            <Typography.Text size="m" style={{ opacity: 0.7 }}>Стоимость:</Typography.Text>
                                            <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--max-ui-color-accent)' }}>
                                                {pack.price.toLocaleString('ru-RU')} ₽
                                            </span>
                                        </Flex>
                                        <Button size="l" mode="primary" style={{ width: '100%', borderRadius: '10px', background: 'linear-gradient(135deg, var(--max-ui-color-primary), #745794)' }} onClick={() => handlePurchase(pack)}>
                                            Купить в 1 клик
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </Grid>
                    </div>

                </div>
            </Container>
        </Panel>
    );
};

export default App;
