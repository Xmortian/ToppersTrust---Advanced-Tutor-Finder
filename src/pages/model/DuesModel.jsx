import React from 'react';
import { supabase } from '../../supabase.js';

const BACKEND_URL = 'http://localhost:3000';
const INITIATE_PAYMENT_ENDPOINT = `${BACKEND_URL}/api/payment/initiate`;


export async function getAuthUser() {
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        return { user: data?.user ?? null, error: null };
    } catch (error) {
        console.error('Auth error:', error);
        return { user: null, error };
    }
}

export async function fetchTutorProfileByUserId(userId) {
    try {
        const { data, error } = await supabase
            .from('tutor')
            .select('id, name, email, phone')
            .eq('user_id', userId)
            .single();
        
        if (error) throw error;
        return { profile: data ?? null, error: null };
    } catch (error) {
        console.error('Profile fetch error:', error);
        return { profile: null, error };
    }
}

export async function fetchOutstandingDues(tutorId) {
    if (!tutorId) return { due: null, error: new Error('Tutor ID is required') };
    
    try {
        const { data: due, error } = await supabase
            .from('dues')
            .select('id, amount, payment, payed_at')
            .eq('id', tutorId) // dues.id is the foreign key to tutor.id
            .eq('payment', false) // payment = false means unpaid
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return { due: null, error: null };
            }
            console.error('Dues query error:', error);
            throw error;
        }

        if (!due) {
            return { due: null, error: null };
        }
        
        return { 
            due: { 
                dueId: due.id, 
                amount: parseFloat(due.amount),
                date: due.payed_at ? new Date(due.payed_at).toLocaleDateString() : 'Not yet paid'
            }, 
            error: null 
        };
    } catch (error) {
        console.error('Dues fetch error:', error);
        return { due: null, error };
    }
}

export async function initiateSSLCommerzPayment(tutorId, tutorName, amount, email, phone) {
    try {
        if (!tutorId || !amount || !email) {
            return {
                success: false,
                message: 'Missing required payment information',
            };
        }

        const response = await fetch(INITIATE_PAYMENT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tutorId: tutorId,
                tutorName: tutorName || 'Tutor',
                amount: parseFloat(amount).toFixed(2),
                email: email,
                phone: phone || ''
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response error:', errorText);
            return {
                success: false,
                message: `Server error: ${response.status} - ${errorText}`,
            };
        }

        const result = await response.json();

        if (result.success) {
            return {
                success: true,
                message: result.message,
                redirectUrl: result.redirectUrl,
            };
        } else {
            return {
                success: false,
                message: result.message || 'Payment initiation failed on the server.',
            };
        }

    } catch (error) {
        console.error("Backend fetch error:", error);
        return {
            success: false,
            message: `Could not connect to payment server: ${error.message}`,
        };
    }
}