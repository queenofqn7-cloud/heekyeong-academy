import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Menu, 
  X, 
  GraduationCap, 
  Tv, 
  Instagram, 
  CheckCircle2, 
  Send, 
  ChevronRight, 
  UserCheck, 
  BookOpen, 
  Users, 
  Award, 
  Cpu, 
  MessageSquare, 
  Video, 
  Smartphone, 
  Clapperboard, 
  Paintbrush, 
  Briefcase, 
  Mail, 
  Phone, 
  ArrowUp,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { METHOD_CARDS, COURSE_CARDS, RECOMMEND_CARDS } from './data';
import { Inquiry } from './types';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab ] = useState<'course' | 'lecture' | 'profile' | 'corporate'>('course');
  
  // Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [copiedInquiryId, setCopiedInquiryId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('academy_inquiries');
    if (saved) {
      try {
        setSubmittedInquiries(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading inquiries', e);
      }
    }
  }, []);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처는 필수 입력 정보입니다.');
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      type: activeTab,
      name,
      phone,
      email,
      details,
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newInquiry, ...submittedInquiries];
    setSubmittedInquiries(updated);
    localStorage.setItem('academy_inquiries', JSON.stringify(updated));

    // Reset fields
    setName('');
    setPhone('');
    setEmail('');
    setDetails('');

    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  // Helper to copy inquiry contents to clipboard
  const copyInquiryToClipboard = (inq: Inquiry) => {
    const typeLabel = {
      course: '교육 신청',
      lecture: '강연 섭외 문의',
      profile: '강사 프로필 요청',
      corporate: '기업 교육 문의'
    }[inq.type];

    const textToCopy = `[한희경 AI 아카데미 문의 내역]
구분: ${typeLabel}
성함/단체명: ${inq.name}
연락처: ${inq.phone}
이메일: ${inq.email || '미입력'}
문의내용: ${inq.details || '미입력'}
작성일시: ${inq.createdAt}
---------------------------------
위 문의 사항을 확인하여 주시기 바랍니다.`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedInquiryId(inq.id);
      setTimeout(() => {
        setCopiedInquiryId(null);
      }, 2000);
    });
  };

  // Pre-fill query type from hero buttons
  const handleQueryTypeSelect = (type: 'course' | 'lecture' | 'profile' | 'corporate') => {
    setActiveTab(type);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Copy email to clipboard function
  const copyEmailAddress = () => {
    navigator.clipboard.writeText('queenofqn7@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  // Floating scroll up button
  const [showScrollUp, setShowScrollUp] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icon selector based on curriculum index
  const getCourseIcon = (id: string) => {
    switch (id) {
      case 'course-1':
        return <MessageSquare className="w-6 h-6 text-violet" />;
      case 'course-2':
        return <Video className="w-6 h-6 text-deeppurple" />;
      case 'course-3':
        return <Smartphone className="w-6 h-6 text-gold" />;
      case 'course-4':
        return <Clapperboard className="w-6 h-6 text-violet" />;
      case 'course-5':
        return <Paintbrush className="w-6 h-6 text-deeppurple" />;
      case 'course-6':
        return <Briefcase className="w-6 h-6 text-gold" />;
      default:
        return <Cpu className="w-6 h-6 text-deeppurple" />;
    }
  };

  // Icon selector for methodology index
  const getMethodIcon = (id: string) => {
    switch (id) {
      case 'method-1':
        return <BookOpen className="w-7 h-7 text-deeppurple" />;
      case 'method-2':
        return <Users className="w-7 h-7 text-violet" />;
      case 'method-3':
        return <Award className="w-7 h-7 text-gold" />;
      case 'method-4':
        return <UserCheck className="w-7 h-7 text-deeppurple" />;
      default:
        return <GraduationCap className="w-7 h-7 text-violet" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            id="toast-notification"
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-deeppurple text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border border-violet/20 max-w-sm md:max-w-md w-[calc(100vw-2rem)]"
          >
            <div className="bg-gold p-2 rounded-full text-deeppurple">
              <CheckCircle2 className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="font-semibold text-sm">문의가 성공적으로 저장되었습니다!</p>
              <p className="text-xs text-cream/80 mt-0.5">아래 '내 문의내역'에서 복사하여 공유할 수 있습니다.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Navigation */}
      <header id="header" className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-deeppurple/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-deeppurple to-violet flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              한
            </span>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight text-deeppurple group-hover:text-violet transition-colors">
                한희경 AI 아카데미
              </span>
              <span className="text-[10px] tracking-widest text-[#F59E0B] font-semibold -mt-0.5 uppercase">
                AI Academy
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#instructor" className="text-sm font-medium text-darkgray hover:text-deeppurple transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-deeppurple hover:after:w-full after:transition-all">
              강사소개
            </a>
            <a href="#methodology" className="text-sm font-medium text-darkgray hover:text-deeppurple transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-deeppurple hover:after:w-full after:transition-all">
              교육방식
            </a>
            <a href="#curriculum" className="text-sm font-medium text-darkgray hover:text-deeppurple transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-deeppurple hover:after:w-full after:transition-all">
              교육내용
            </a>
            <a href="#contact" className="text-sm font-medium text-darkgray hover:text-deeppurple transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-deeppurple hover:after:w-full after:transition-all">
              교육문의
            </a>
          </nav>

          <div className="hidden md:block">
            <button 
              id="header-cta-btn"
              onClick={() => handleQueryTypeSelect('course')}
              className="bg-deeppurple text-cream hover:bg-violet hover:text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              교육 문의하기
            </button>
          </div>

          {/* Mobile hamburger */}
          <button 
            id="mobile-menu-toggle"
            className="md:hidden p-2 text-darkgray hover:text-deeppurple transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-softcream border-b border-deeppurple/10 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                <a 
                  href="#instructor" 
                  className="text-base font-semibold text-darkgray hover:text-deeppurple py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  강사소개
                </a>
                <a 
                  href="#methodology" 
                  className="text-base font-semibold text-darkgray hover:text-deeppurple py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  교육방식
                </a>
                <a 
                  href="#curriculum" 
                  className="text-base font-semibold text-darkgray hover:text-deeppurple py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  교육내용
                </a>
                <a 
                  href="#contact" 
                  className="text-base font-semibold text-darkgray hover:text-deeppurple py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  교육문의
                </a>
                <hr className="border-deeppurple/10 my-1" />
                <button 
                  id="mobile-cta-btn"
                  onClick={() => {
                    handleQueryTypeSelect('course');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-deeppurple hover:bg-violet text-white py-3 rounded-xl font-medium text-center shadow-md transition-all"
                >
                  지금 교육 신청하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
          {/* Ambient AI light particles / curved backdrops */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-gradient-to-tr from-deeppurple/10 to-violet/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-bl from-gold/15 to-violet/10 blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left text panel */}
              <div className="lg:col-span-7 select-text">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-1.5 bg-deeppurple/5 border border-deeppurple/10 px-3.5 py-1.5 rounded-full text-violet text-xs font-semibold uppercase tracking-wider mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold fill-gold" />
                  비전공자 맞춤형 실전 교육
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  id="hero-title"
                  className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-deeppurple tracking-tight leading-[1.15] mb-6"
                >
                  한희경 <span className="text-violet relative">AI <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gold rounded-full opacity-60"></span></span> 아카데미
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  id="hero-main-copy"
                  className="font-sans text-xl md:text-2xl font-bold text-darkgray leading-relaxed mb-6"
                >
                  AI를 어렵게 설명하지 않습니다.<br />
                  <span className="text-deeppurple">직접 만들고, 바로 활용할 수 있게</span> 가르칩니다.
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  id="hero-sub-copy"
                  className="text-base md:text-lg text-darkgray/85 leading-relaxed max-w-2xl mb-10 font-normal"
                >
                  ChatGPT부터 AI 영상 제작, 유튜브 콘텐츠, 홍보물 제작까지<br className="hidden sm:inline" />
                  처음 배우는 분도 실습을 통해 매력적인 결과물을 완성할 수 있도록 친절하게 안내합니다.
                </motion.p>

                {/* Hero CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 sm:items-center"
                >
                  <button
                    id="hero-apply-btn"
                    onClick={() => handleQueryTypeSelect('course')}
                    className="bg-deeppurple text-white hover:bg-violet px-8 py-4 rounded-2xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    교육 신청하기
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    id="hero-request-btn"
                    onClick={() => handleQueryTypeSelect('lecture')}
                    className="bg-white text-deeppurple hover:bg-softcream border-2 border-deeppurple/20 hover:border-deeppurple px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    강연 섭외 문의하기
                  </button>
                </motion.div>
              </div>

              {/* Right Graphics/Badge Layout */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mx-auto max-w-[360px] md:max-w-[400px] aspect-[4/5] bg-white rounded-3xl shadow-2xl p-6 border-4 border-white overflow-hidden flex flex-col justify-between"
                >
                  {/* Stylized high-end digital illustration background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-deeppurple/5 to-violet/10 z-0" />
                  
                  {/* Sparkle background elements */}
                  <div className="absolute top-10 right-10 text-gold opacity-40 animate-pulse">
                    <Sparkles className="w-8 h-8 fill-current" />
                  </div>
                  <div className="absolute bottom-16 left-8 text-violet opacity-30 animate-pulse">
                    <Sparkles className="w-6 h-6 fill-current" />
                  </div>

                  {/* Top brand accent */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[11px] font-bold tracking-widest text-[#FFF8F0] bg-deeppurple px-3 py-1 rounded-full uppercase">
                      Premium Class
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
                  </div>

                  {/* Main graphic: Beautiful abstract human-centered AI connection */}
                  <div className="relative z-10 my-auto flex flex-col items-center">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-deeppurple to-violet flex items-center justify-center text-white shadow-xl relative mb-6">
                      <Cpu className="w-16 h-16 text-cream" />
                      <div className="absolute -bottom-2 -right-2 bg-gold p-2 rounded-xl text-deeppurple shadow-md">
                        <Sparkles className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                    
                    <h3 className="font-serif font-bold text-xl text-deeppurple text-center">
                      쉽고 안전한 실습 첫걸음
                    </h3>
                    <p className="text-xs text-darkgray/70 text-center mt-2 max-w-[240px]">
                      어려웠던 최신 기술을 한희경 강사님과 함께 즉시 실생활에 적용해 보세요
                    </p>
                  </div>

                  {/* Dynamic interactive visual indicator in the box */}
                  <div className="relative z-10 bg-cream/80 backdrop-blur-sm border border-deeppurple/10 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-darkgray">온·오프라인 실시간 접수 중</p>
                      <p className="text-[10px] text-darkgray/65">비전공자 및 시니어 특화 커리큘럼</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Visual anchor blobs behind the visual */}
                <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-full bg-gold/20 blur-xl pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full bg-violet/20 blur-xl pointer-events-none" />
              </div>

            </div>
          </div>
        </section>

        {/* Section Divider with 곡선 배경 (curved path helper) */}
        <div className="relative h-12 bg-cream overflow-hidden">
          <svg className="absolute bottom-0 w-full h-12 text-white fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,48 C360,15 720,15 1080,48 L1440,48 L1440,0 L0,0 Z"></path>
          </svg>
        </div>

        {/* Instructor Section (강사소개) */}
        <section id="instructor" className="bg-white py-24 select-text">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Beautiful vector avatar representation */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative">
                  {/* Decorative backdrop shapes */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#E5D5C5]/20 to-[#4C1D95]/10 rounded-3xl transform rotate-3" />
                  
                  <div className="relative bg-cream rounded-3xl p-8 border border-deeppurple/10 max-w-[340px] shadow-lg flex flex-col items-center">
                    {/* Abstract modern profile vector art - avoiding bad placeholders */}
                    <div className="w-40 h-40 rounded-full bg-gradient-to-b from-deeppurple to-violet flex items-center justify-center text-white mb-6 shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-darkgray/40 to-transparent flex items-end justify-center pb-3">
                        <span className="text-xs uppercase font-semibold text-cream/90 tracking-widest">Instructor</span>
                      </div>
                      {/* Stylized premium teacher icon representing friendly smile & glasses */}
                      <div className="flex flex-col items-center justify-center">
                        <GraduationCap className="w-16 h-16 text-yellow-300" />
                        <span className="font-serif font-bold text-lg -mt-1">한희경</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="font-serif font-bold text-2xl text-deeppurple mb-1">한희경 강사</h4>
                      <p className="text-xs font-semibold text-gold tracking-widest uppercase mb-4">Academy Director</p>
                      
                      <div className="space-y-2 text-start text-sm text-darkgray/80 border-t border-deeppurple/10 pt-4 w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>한희경 AI 아카데미 대표</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>공공기관, 대학, 복지관 AI 강연 다수</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>시니어 맞춤 스마트 미디어 강연 전문가</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          <span>유튜브 콘텐츠 및 쇼츠 제작 전문 디렉터</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Instructor details */}
              <div className="lg:col-span-7">
                <span className="text-sm font-bold text-violet uppercase tracking-widest block mb-2">Instructor Profile</span>
                <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-deeppurple mb-6">
                  미래의 AI, 가장 인간적인 설명으로 다가갑니다.
                </h2>
                
                <p className="text-lg font-semibold text-darkgray leading-relaxed mb-6">
                  "비전공자도 쉽게 배우는 생성형 AI 실전교육 전문가"
                </p>

                <div className="space-y-6 text-darkgray/85 text-base md:text-lg leading-relaxed">
                  <p>
                    한희경 강사는 <strong>공공기관, 교육기관 및 대학 대상 AI 활성화 교육</strong>을 전문으로 진행하며, 
                    복잡하고 생소한 기술을 시니어와 비전공자 누구나 막힘없이 소화할 수 있도록 친절하고 자상한 실습 중심 수업을 실현하고 있습니다.
                  </p>
                  <p>
                    ChatGPT 질의 공식, 스마트폰을 활용한 유튜브 오리지널 쇼츠 영상 제작, Vrew/CapCut을 거치는 세밀한 모바일 자막 편집, 이메일 마케팅 자동화, 
                    그리고 디자인 캔버스를 도맡아 줄 캔바(Canva) 포스터 제작까지! <strong>단순 암기를 넘어 수업이 끝남과 동시에 손에 바로 쥐는 실생활/업무 밀착형 결과물</strong>을 선사해 드립니다.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-deeppurple/10 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-cream/50 p-4 rounded-2xl border border-deeppurple/5">
                    <p className="text-2xl font-bold font-serif text-deeppurple">100%</p>
                    <p className="text-xs text-darkgray/70 mt-1">실습 및 실전 위주</p>
                  </div>
                  <div className="bg-cream/50 p-4 rounded-2xl border border-deeppurple/5">
                    <p className="text-2xl font-bold font-serif text-deeppurple">쉽게</p>
                    <p className="text-xs text-darkgray/70 mt-1">비전공자 전문 설명</p>
                  </div>
                  <div className="bg-cream/50 p-4 rounded-2xl border border-deeppurple/5 col-span-2 md:col-span-1">
                    <p className="text-2xl font-bold font-serif text-deeppurple">맞춤</p>
                    <p className="text-xs text-darkgray/70 mt-1">소상공인·시니어 최적화</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="relative h-12 bg-cream overflow-hidden">
          <svg className="absolute bottom-0 w-full h-12 text-cream fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,0 C360,33 720,33 1080,0 L1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>

        {/* Methodology Section (교육방식) */}
        <section id="methodology" className="bg-cream/70 py-24 select-text">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3">Our Philosophy</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-deeppurple">
                아카데미의 세상을 밝히는 교육 방식
              </h2>
              <p className="text-sm md:text-base text-darkgray/70 mt-3">
                어렵고 눈물이 날 만큼 막막했던 AI 기술, 한희경 아카데미의 4대 교육 원칙으로 차분하고 든든하게 해결해 드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {METHOD_CARDS.map((card) => (
                <motion.div 
                  key={card.id}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl p-8 shadow-md border border-deeppurple/5 hover:border-deeppurple/10 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="bg-cream p-4 rounded-2xl shrink-0">
                    {getMethodIcon(card.id)}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-violet bg-deeppurple/5 px-2.5 py-1 rounded-full uppercase">
                      {card.tag}
                    </span>
                    <h3 className="font-serif font-bold text-xl text-deeppurple mt-2.5 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-darkgray/75 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section (교육내용) */}
        <section id="curriculum" className="bg-white py-24 select-text">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-violet uppercase tracking-widest bg-deeppurple/5 px-3 py-1.5 rounded-full inline-block mb-3">Programs</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-deeppurple">
                현장 적용률 100% 실전 커리큘럼
              </h2>
              <p className="text-sm md:text-base text-darkgray/70 mt-3">
                생성형 AI 기초 원형부터 직무 및 생업 홍보물 가공 채널까지 마스터하는 체계적인 특전 클래스입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COURSE_CARDS.map((course) => (
                <div 
                  key={course.id}
                  className="group bg-softcream rounded-3xl p-8 border border-deeppurple/5 hover:border-violet/20 hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-deeppurple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {getCourseIcon(course.id)}
                    </div>
                    <h3 className="font-serif font-bold text-xl text-deeppurple mb-3 group-hover:text-violet transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-darkgray/80 leading-relaxed font-normal">
                      {course.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-deeppurple/5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold">상시 개강 문의</span>
                    <button 
                      onClick={() => handleQueryTypeSelect('course')}
                      className="text-xs font-bold text-deeppurple group-hover:text-violet flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      문의하러 가기
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommendations Section (추천 대상) */}
        <section className="bg-cream/40 py-24 border-t border-deeppurple/5 select-text">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-violet bg-deeppurple/5 px-3 py-1.5 rounded-full inline-block uppercase tracking-widest mb-3">Recommend</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-deeppurple">
                이런 분들께 정말로 추천합니다
              </h2>
              <p className="text-sm md:text-base text-darkgray/70 mt-3">
                한희경 강사와 함께라면, 그 어떤 장벽도 기회와 설렘으로 빠르게 바뀝니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {RECOMMEND_CARDS.map((rec, idx) => (
                <div 
                  key={rec.id}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-deeppurple/5 flex items-start gap-5 relative overflow-hidden"
                >
                  {/* Decorative badge number in background */}
                  <span className="absolute bottom-[-15px] right-[-10px] text-8xl font-black text-deeppurple/5 pointer-events-none select-none">
                    0{idx + 1}
                  </span>

                  <div className="bg-gold/10 p-3 rounded-full text-gold shrink-0 mt-1">
                    <Sparkles className="w-6 h-6 fill-gold" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-serif font-bold text-lg text-deeppurple mb-2">
                      {rec.title}
                    </h3>
                    <p className="text-sm text-darkgray/75 leading-relaxed font-normal">
                      {rec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Inquiry (교육문의) Section */}
        <section id="contact" className="bg-white py-24 select-text">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest bg-gold/10 px-3 py-1.5 rounded-full inline-block mb-3">Inquiry Form</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-deeppurple">
                교육 문의 및 강의 섭외
              </h2>
              <p className="text-sm md:text-base text-darkgray/75 mt-3 max-w-lg mx-auto leading-relaxed">
                개인레슨, 단체교양, 소상공인 실무 클래스, 기업체 단체특강 또는 대학 초청 강연이 예정되어 있다면, 아래 원하시는 항목을 클릭 후 편하게 문의 주세요.
              </p>
            </div>

            {/* Quick action buttons for enquiry tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <button
                id="tab-btn-course"
                onClick={() => setActiveTab('course')}
                className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all border text-center ${
                  activeTab === 'course'
                    ? 'bg-deeppurple text-white border-deeppurple shadow-md'
                    : 'bg-cream/40 text-darkgray border-deeppurple/15 hover:bg-cream'
                }`}
              >
                교육 신청하기
              </button>
              <button
                id="tab-btn-lecture"
                onClick={() => setActiveTab('lecture')}
                className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all border text-center ${
                  activeTab === 'lecture'
                    ? 'bg-deeppurple text-white border-deeppurple shadow-md'
                    : 'bg-cream/40 text-darkgray border-deeppurple/15 hover:bg-cream'
                }`}
              >
                강연 섭외 문의
              </button>
              <button
                id="tab-btn-profile"
                onClick={() => setActiveTab('profile')}
                className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all border text-center ${
                  activeTab === 'profile'
                    ? 'bg-deeppurple text-white border-deeppurple shadow-md'
                    : 'bg-cream/40 text-darkgray border-deeppurple/15 hover:bg-cream'
                }`}
              >
                강사 프로필 요청
              </button>
              <button
                id="tab-btn-corporate"
                onClick={() => setActiveTab('corporate')}
                className={`py-3.5 px-4 rounded-2xl text-sm font-semibold transition-all border text-center ${
                  activeTab === 'corporate'
                    ? 'bg-deeppurple text-white border-deeppurple shadow-md'
                    : 'bg-cream/40 text-darkgray border-deeppurple/15 hover:bg-cream'
                }`}
              >
                기업 교육 문의
              </button>
            </div>

            {/* Fully Functional Form */}
            <div id="inquiry-form-container" className="bg-cream/40 rounded-3xl p-6 md:p-10 border border-deeppurple/10 shadow-inner">
              <div className="mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                <h3 className="font-semibold text-base text-deeppurple uppercase font-serif">
                  {
                    {
                      course: '생성형 AI 교육 신청 정보 입력',
                      lecture: '강연 섭외 및 대관 희망 정보 입력',
                      profile: '공식 제안서 및 강사 프로필 수령 정보 입력',
                      corporate: '임직원 기업 사내 연수 프로젝트 입력'
                    }[activeTab]
                  }
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-darkgray mb-2" htmlFor="inquirer-name">
                      성함 또는 단체명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inquirer-name"
                      type="text"
                      className="w-full bg-white border border-deeppurple/15 focus:outline-none focus:border-deeppurple/60 rounded-xl px-4 py-3.5 text-sm darkgray font-medium"
                      placeholder="예) 홍길동 / 공공기관명"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-darkgray mb-2" htmlFor="inquirer-phone">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inquirer-phone"
                      type="tel"
                      className="w-full bg-white border border-deeppurple/15 focus:outline-none focus:border-deeppurple/60 rounded-xl px-4 py-3.5 text-sm darkgray font-medium"
                      placeholder="예) 010-1234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-darkgray mb-2" htmlFor="inquirer-email">
                    이메일 주소
                  </label>
                  <input
                    id="inquirer-email"
                    type="email"
                    className="w-full bg-white border border-deeppurple/15 focus:outline-none focus:border-deeppurple/60 rounded-xl px-4 py-3.5 text-sm darkgray font-medium"
                    placeholder="예) customer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-darkgray mb-2" htmlFor="inquirer-details">
                    상세 문의 사항 기입
                  </label>
                  <textarea
                    id="inquirer-details"
                    className="w-full bg-white border border-deeppurple/15 focus:outline-none focus:border-deeppurple/60 rounded-xl px-4 py-3.5 text-sm darkgray font-medium h-32 resize-none"
                    placeholder="원하시는 세부 교육 분야, 예상 일정 및 수강 목표를 기입해주세요. 더 정교하고 부드러운 상담이 진행됩니다."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                {/* Submit button with hover dynamics */}
                <button
                  id="submit-query-btn"
                  type="submit"
                  className="w-full bg-deeppurple hover:bg-violet text-cream py-4 rounded-2xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  문의 사항 접수 및 기입 완료하기
                </button>
              </form>
            </div>

            {/* Local persistence: Saved queries history accordion */}
            {submittedInquiries.length > 0 && (
              <div id="local-inquiry-history" className="mt-12 pt-8 border-t border-deeppurple/10">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-deeppurple" />
                  <h4 className="font-serif font-bold text-lg text-deeppurple">
                    나의 작성된 문의 목록 ({submittedInquiries.length})
                  </h4>
                </div>
                <p className="text-xs text-darkgray/75 mb-4">
                  현재 본인의 브라우저 캐시에 모의 접수된 상세 정보입니다. 아래 버튼을 눌러 소중한 신청 폼을 전체 복사하여 강사 이메일 복사 혹은 이포스터와 함께 발송할 때 유용하게 공유할 수 있습니다.
                </p>

                <div className="space-y-4">
                  {submittedInquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="bg-cream/30 p-5 rounded-2xl border border-deeppurple/10 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all hover:bg-white"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-deeppurple bg-gold/20 px-2 py-0.5 rounded">
                            {
                              {
                                course: '교육 신청',
                                lecture: '강연 섭외',
                                profile: '강사 프로필 요청',
                                corporate: '기업 교육 문의'
                              }[inq.type]
                            }
                          </span>
                          <span className="text-xs text-darkgray/60 font-semibold">{inq.createdAt}</span>
                        </div>
                        <p className="text-sm font-bold text-darkgray">{inq.name}님 ({inq.phone})</p>
                        {inq.details && <p className="text-xs text-darkgray/70 line-clamp-1">{inq.details}</p>}
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <button
                          onClick={() => copyInquiryToClipboard(inq)}
                          className="bg-white hover:bg-deeppurple hover:text-white border border-deeppurple/15 px-3 py-2 rounded-xl text-xs font-bold text-deeppurple flex items-center gap-1 transition-all"
                        >
                          {copiedInquiryId === inq.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              복사완료!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              신청서 내용 복사
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            const filtered = submittedInquiries.filter(i => i.id !== inq.id);
                            setSubmittedInquiries(filtered);
                            localStorage.setItem('academy_inquiries', JSON.stringify(filtered));
                          }}
                          className="text-xs font-semibold text-red-500 hover:underline px-2 py-1"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer Design */}
      <footer id="footer" className="bg-deeppurple text-cream pt-16 pb-12 select-text border-t-4 border-gold">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
            
            <div className="md:col-span-5 select-text">
              <a href="#" className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-deeppurple font-bold text-base">
                  한
                </span>
                <span className="font-serif font-bold text-xl text-white">
                  한희경 AI 아카데미
                </span>
              </a>
              <p className="text-sm text-cream/75 leading-relaxed max-w-sm font-normal">
                비전공자도 시니어도 마술사처럼 쉽게 다루는 인공지능 실습! 
                상상을 현실로 만드는 최고의 실전 교육 파트너가 되어 드립니다.
              </p>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-4">교육 카테고리</h4>
              <ul className="space-y-2 text-sm text-cream/80">
                <li>생성형 AI 실습 과정</li>
                <li>ChatGPT 프롬프트</li>
                <li>AI 영상 & 쇼츠 제작</li>
                <li>소상공인 챗봇 마케팅</li>
              </ul>
            </div>

            <div className="md:col-span-4 select-text">
              <h4 className="font-serif font-bold text-sm text-gold uppercase tracking-wider mb-4">강사 연계 직통 문의</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-cream/85">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>queenofqn7@gmail.com</span>
                  <button 
                    onClick={copyEmailAddress}
                    className="ml-2 bg-cream/10 hover:bg-cream/25 text-[10px] px-2 py-0.5 rounded border border-cream/20 font-sans transition-all"
                  >
                    {copiedEmail ? '복사됨!' : '복사'}
                  </button>
                </div>
                <div className="flex items-center gap-2 text-cream/85">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>구글폼 또는 이메일 접수 상시 확인</span>
                </div>
                <p className="text-xs text-cream/65 pt-2 border-t border-cream/10">
                  * 주말 및 공휴일에도 강연 제안서 접수 시 24시간 이내 신속히 가용 일정을 알려 드립니다.
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/65 font-normal">
            <p>© 2026 한희경 AI 아카데미. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#instructor" className="hover:text-white transition-colors">강사소개</a>
              <span>·</span>
              <a href="#curriculum" className="hover:text-white transition-colors">교육프로그램</a>
              <span>·</span>
              <a href="#contact" className="hover:text-white transition-colors text-gold">대관/강연섭외</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll up button */}
      <AnimatePresence>
        {showScrollUp && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-deeppurple text-white p-3.5 rounded-full shadow-2xl border border-gold/40 hover:bg-violet transition-colors cursor-pointer"
            id="scroll-to-top-btn"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
